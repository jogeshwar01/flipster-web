import { Navigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import MarketBar from "../components/MarketBar";
import SwapInterface from "../components/SwapInterface";
import TradeInterface from "../components/TradeInterface";
import Winners from "../components/Winners";
import { Helmet } from "react-helmet";
import { useContext, useMemo } from "react";
import { TradesContext } from "../state/TradesProvider";

export const Trade = () => {
  const { market } = useParams();
  const { ticker, tickers } = useContext(TradesContext);

  const isTickerValid = useMemo(() => {
    if (!tickers.length) return true;

    return tickers.some((t) => t.symbol === market);
  }, [market, tickers]);

  if (!isTickerValid) {
    return <Navigate to="/trade/BTCUSDT.PERP" />;
  }

  return (
    <div className="flex h-full flex-col">
      <Helmet>
        <title>{`${
          ticker?.symbol && ticker?.markPrice
            ? Number(ticker?.markPrice).toFixed(1) +
              " | Trade " +
              ticker?.symbol +
              " | "
            : ""
        } Flipster`}</title>
        <meta
          name="description"
          content="Trade crypto perpetual futures on Flipster"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>

      <div className="flex flex-col gap-8 lg:hidden uppercase h-[100vh] text-2xl font-mono w-full justify-center items-center">
        <div className="flex gap-2 items-center">
          <img src="/flipster-logo.svg" alt="Flipster" className="h-8" />
        </div>
        <div>Mobile Trading Coming Soon</div>
      </div>

      <header className="hidden shrink-0 grid-cols-5 bg-background lg:flex">
        <NavBar />
      </header>

      <main className="w-screen h-screen bg-main-bg pb-[36px]">
        <div className="flex flex-col w-full h-full">
          <div className="relative flex-grow h-full w-full overflow-x-hidden overflow-y-auto thin-scroll">
            <div className="w-full h-full md:absolute">
              <div className="flex flex-col w-full h-full sm:min-h-[950px] lg:min-h-[900]">
                <div className="flex flex-col h-full sm:px-2 sm:pt-2">
                  <div
                    className="gap-2 h-full grid"
                    style={{
                      gridTemplateColumns: "4fr minmax(296px, 1fr) 330px",
                      gridTemplateRows: "minmax(54px, auto) 1fr",
                    }}
                  >
                    <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
                      <MarketBar market={market as string} />
                    </div>
                    <div style={{ gridArea: "1 / 3 / 3 / 4" }}>
                      <SwapInterface market={market as string} />
                    </div>
                    <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
                      <TradeInterface market={market as string} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Winners Ticker - Sticky at bottom */}
      <Winners />
    </div>
  );
};
