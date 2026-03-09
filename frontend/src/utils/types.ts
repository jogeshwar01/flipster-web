// Flipster Ticker structure
export interface Ticker {
  symbol?: string; // Added for convenience
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

export enum Position {
  LONG = "LONG",
  SHORT = "SHORT",
}

export enum OrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
}

// Flipster Kline structure
export interface KLine {
  open: string;
  high: string;
  low: string;
  close: string;
  start: number; // timestamp in milliseconds
  volume: string;
  end: number; // timestamp in milliseconds
  turnover: string; // Flipster uses 'turnover' instead of 'quoteVolume'
}

export interface Trade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
}

export interface Depth {
  bids: [string, string][];
  asks: [string, string][];
  lastUpdateId?: string;
}

// Flipster Instrument/Spec structure
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
