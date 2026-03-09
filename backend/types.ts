// Flipster API Types

export interface FlipsterInstrument {
  symbol: string;
  keywords: string[];
  icon: string;
  displayName: string;
  displayShortName: string;
  tags: string[];
  productType: string;
  isListed: boolean;
  tickSize: string;
  baseCurrency: string;
  quoteCurrency: string;
  settlementCurrency: string;
  positionUnit: string;
  notionalMinOrderAmount: string;
  notionalMaxOrderAmount: string;
  notionalMaxPosition: string;
  unitOrderQty: string;
  fundingType: string;
  baseInterestRate: string;
  fundingRateClipOverride: string;
  initMarginRate: string;
  maintMarginRate: string;
  crossMarginSupported: boolean;
  pricePrecision: number;
  defaultMaxSlippage: string;
  positionBracket: string;
  longPositionReduceOnlyTriggerOiInUsdt: string;
  shortPositionReduceOnlyTriggerOiInUsdt: string;
  maxBuyAmountDaily: string | null;
  maxSellAmountDaily: string | null;
}

export interface FlipsterSpecsResponse {
  p: string;
  t: {
    instruments: {
      s: {
        [symbol: string]: FlipsterInstrument;
      };
    };
  };
}

export interface FlipsterKline {
  t: number; // timestamp
  o: string; // open
  c: string; // close
  l: string; // low
  h: string; // high
  v: string; // volume
  m: string; // turnover
}

export interface FlipsterKlinesResponse {
  intervals: FlipsterKline[];
}

export interface FlipsterTicker {
  midPrice: string;
  markPrice: string;
  indexPrice: string;
  fundingRate: string;
  fundingTime: string;
  priceChange24h: string;
  priceChangePct24h: string;
  high24h: string;
  low24h: string;
  volume24h: string;
  turnover24h: string;
  openInterest: string;
  openInterestInUsdt: string;
}
