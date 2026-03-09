import axios from "axios";
import { KLine, FlipsterInstrument } from "../utils/types";
import { PROXY_SERVER_URL } from "../utils/constants";

// Flipster API response types
interface FlipsterKline {
  t: number; // timestamp
  o: string; // open
  c: string; // close
  l: string; // low
  h: string; // high
  v: string; // volume
  m: string; // turnover
}

interface FlipsterKlinesResponse {
  intervals: FlipsterKline[];
}

interface FlipsterSpecsResponse {
  p: string;
  t: {
    instruments: {
      s: {
        [symbol: string]: FlipsterInstrument;
      };
    };
  };
}

/**
 * Get all available instruments/specs from Flipster
 */
export async function getSpecs(): Promise<FlipsterInstrument[]> {
  const response = await axios.get<FlipsterSpecsResponse>(
    `${PROXY_SERVER_URL}/specs`,
  );

  // Extract instruments from the nested structure
  const instruments = response.data.t.instruments.s;
  return Object.values(instruments);
}

/**
 * Get klines/candles data for charting
 * @param symbol - Trading pair symbol (e.g., "BTCUSDT.PERP")
 * @param interval - Time interval in minutes (e.g., "1", "5", "15", "60", "240", "1440")
 */
export async function getKlines(
  symbol: string,
  interval: string,
): Promise<KLine[]> {
  // Backend calculates optimal fixed windows automatically
  // No need to send timestamps from frontend
  const response = await axios.get<FlipsterKlinesResponse>(
    `${PROXY_SERVER_URL}/klines?symbol=${symbol}&interval=${interval}`,
  );

  // Converting Flipster format to our KLine format
  const klines: KLine[] = response.data.intervals.map(
    (item: FlipsterKline) => ({
      start: item.t, // timestamp in milliseconds
      open: item.o,
      high: item.h,
      low: item.l,
      close: item.c,
      volume: item.v,
      end: item.t, // Flipster doesn't provide end time, use start time
      turnover: item.m, // Flipster uses 'turnover' instead of 'quoteVolume'
    }),
  );

  // Sorting the data by the start time (ascending order)
  const sortedData = klines.sort((x, y) => (x.start < y.start ? -1 : 1));

  return sortedData;
}

/**
 * Get winners/top performers data
 */
export async function getWinners(): Promise<{
  winners: any[];
  tradeTabText?: string;
  title?: string;
}> {
  const response = await axios.get(`${PROXY_SERVER_URL}/winners`);
  return response.data || { winners: [] };
}
