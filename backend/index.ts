import express from "express";
import cors from "cors";
import { FLIPSTER_API_BASE } from "./constants";
import axios from "axios";
import { FlipsterSpecsResponse, FlipsterKlinesResponse } from "./types";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Calculate fixed window timestamps that match Flipster's exact caching strategy
 * These are the EXACT windows used by Flipster, hardcoded as reference points
 *
 * Reference windows (captured at 1772960876 / 2026-03-08 09:07:56 UTC):
 * - 1m:  1772958000-1772987940 (ends +7h in future)
 * - 5m:  1772820000-1772969700 (ends +2h in future)
 * - 15m: 1772550000-1772999100 (ends +10h in future)
 * - 1H:  1771200000-1772996400 (ends +9h in future)
 * - 4H:  1766880000-1774065600 (ends +12d in future)
 */
// function calculateFixedWindow(intervalMinutes: number): {
//   start: number;
//   end: number;
// } {
//   const intervalSec = intervalMinutes * 60;
//   const numCandles = 499;
//   const now = Math.floor(Date.now() / 1000);

//   // Reference windows - these are the exact timestamps Flipster uses
//   // Captured at time: 1772960876 (2026-03-08 09:07:56 UTC)
//   const referenceTime = 1772960876;
//   const referenceWindows: { [key: number]: { start: number; end: number } } = {
//     1: { start: 1772958000, end: 1772987940 },
//     5: { start: 1772820000, end: 1772969700 },
//     15: { start: 1772550000, end: 1772999100 },
//     60: { start: 1771200000, end: 1772996400 },
//     240: { start: 1766880000, end: 1774065600 },
//   };

//   // Get reference window for this interval
//   const refWindow = referenceWindows[intervalMinutes];

//   if (!refWindow) {
//     // Fallback for unsupported intervals (1440 = 1D, etc.)
//     const endAligned = Math.floor(now / intervalSec) * intervalSec;
//     const startAligned = endAligned - numCandles * intervalSec;
//     return { start: startAligned, end: endAligned };
//   }

//   // Calculate the original buffer (how far into future the window extended)
//   const originalBuffer = refWindow.end - referenceTime;

//   // Check if we still have sufficient future coverage
//   const currentBuffer = refWindow.end - now;

//   // Use a higher target buffer (1.8x original) to match Flipster's caching behavior
//   const targetBuffer = Math.floor(originalBuffer * 1.8);

//   if (currentBuffer >= targetBuffer) {
//     // Reference window still has enough future buffer, use it as-is
//     return refWindow;
//   }

//   // Need to shift the window forward
//   // Flipster shifts by whole hours to maintain time-of-day alignment
//   // Restore the target buffer
//   const targetEnd = now + targetBuffer;

//   // Calculate how many hours to shift from reference (round to nearest hour)
//   const hourInSec = 3600;
//   const hoursToShift = Math.round((targetEnd - refWindow.end) / hourInSec);
//   const shiftAmount = hoursToShift * hourInSec;

//   // Shift the window forward by whole hours
//   const newStart = refWindow.start + shiftAmount;
//   const newEnd = refWindow.end + shiftAmount;

//   return { start: newStart, end: newEnd };
// }

// Get all available specs/instruments
app.get("/specs", async (req: any, res: any) => {
  try {
    const url = `${FLIPSTER_API_BASE}/snapshot/specs?showAll=true`;
    const response = await axios.get<FlipsterSpecsResponse>(url, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US",
        origin: "https://flipster.io",
        referer: "https://flipster.io/",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching specs:", error);
    res.status(500).json({ error: "Failed to fetch specs from Flipster API" });
  }
});

// Get klines/candles data for charting
app.get("/klines", async (req: any, res: any) => {
  const { symbol, interval } = req.query;

  if (!symbol || !interval) {
    return res.status(400).json({ error: "symbol and interval are required" });
  }

  try {
    const intervalMinutes = Number(interval);

    // Hardcoded window for now
    const startSeconds = 1736640000;
    const endSeconds = 1779753600;

    const url = `${FLIPSTER_API_BASE}/chart/klines/${symbol}/1D/${startSeconds}-${endSeconds}?priceType=MID`;
    console.log("Requesting klines:", url);

    const now = Math.floor(Date.now() / 1000);
    const futureTime = endSeconds - now;
    const pastTime = now - startSeconds;

    console.log(`  Interval: ${intervalMinutes}m`);
    console.log(`  Window: ${startSeconds} to ${endSeconds}`);
    console.log(
      `  Coverage: -${Math.floor(pastTime / 3600)}h (past) to +${Math.floor(futureTime / 3600)}h (future)`,
    );
    console.log(
      `  Candles: ${(endSeconds - startSeconds) / (intervalMinutes * 60)}`,
    );

    const response = await axios.get<FlipsterKlinesResponse>(url, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US",
        origin: "https://flipster.io",
        referer: "https://flipster.io/",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching klines:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Requested URL:", error.config?.url);
    res.status(500).json({
      error: "Failed to fetch klines from Flipster API",
      details: error.response?.data,
    });
  }
});

// Winners endpoint - proxy to Flipster winners API
app.get("/winners", async (req: any, res: any) => {
  try {
    const response = await axios.get(
      "https://api.flipster.io/api/v1/exchange/winners",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US",
          origin: "https://flipster.io",
          referer: "https://flipster.io/",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-prex-client-platform": "web",
          "x-prex-client-version": "release-web-3.10.110",
        },
      },
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching winners:", error);
    res.status(500).json({
      error: "Failed to fetch winners from Flipster API",
      details: error.response?.data,
    });
  }
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
