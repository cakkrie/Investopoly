export interface AssetEducation {
  industry: string;
  explanation: string;
  financialFactors: string[];
  keyMetrics?: string[];
}

export const assetEducationData: Record<string, AssetEducation> = {
  // Bonds
  'US Treasury Bond': {
    industry: 'Government Bonds',
    explanation: 'Debt securities issued by the U.S. government, considered one of the safest investments. Investors lend money to the government, which promises to pay interest regularly and return the principal at maturity.',
    financialFactors: [
      'Interest Rate Risk: Bond prices fall when market rates rise',
      'Inflation: High inflation erodes the purchasing power of fixed income',
      'Credit Rating: U.S. Treasuries have the highest AAA credit rating',
      'Liquidity: Very easy to buy and sell with deep market depth'
    ],
    keyMetrics: ['Yield', 'Maturity Date', 'Coupon Rate']
  },
  'Corporate Bond': {
    industry: 'Corporate Debt',
    explanation: 'Debt instruments issued by companies to raise capital. Slightly higher risk than government bonds but typically offer higher interest returns.',
    financialFactors: [
      'Credit Risk: Company may default and fail to repay debt',
      'Industry Performance: Health of the issuing company\'s sector',
      'Interest Rate Environment: Central bank policy affects borrowing costs',
      'Company Financials: Profitability and debt levels'
    ],
    keyMetrics: ['Credit Rating', 'Yield to Maturity', 'Duration']
  },
  'Municipal Bond': {
    industry: 'Municipal Bonds',
    explanation: 'Bonds issued by local governments or municipal agencies to fund public projects. In the U.S., they typically enjoy tax advantages.',
    financialFactors: [
      'Tax Advantages: Interest income is usually exempt from federal tax',
      'Local Economy: Economic health of the issuing region',
      'Credit Risk: Though low, default is still possible',
      'Interest Rate Sensitivity: Relatively sensitive to rate changes'
    ],
    keyMetrics: ['Tax-Equivalent Yield', 'Credit Rating', 'Insurance Status']
  },
  'Inflation-Protected Bond': {
    industry: 'Treasury Inflation-Protected Securities (TIPS)',
    explanation: 'Government bonds with principal adjusted for inflation, protecting investors from inflation erosion. When CPI rises, both principal and interest payments increase.',
    financialFactors: [
      'Inflation Expectations: Effective tool against inflation',
      'Real Interest Rate: Provides stable real returns',
      'Economic Cycle: Performs well during high inflation periods',
      'Liquidity: Less trading activity than regular Treasuries'
    ],
    keyMetrics: ['Real Yield', 'CPI Adjustment', 'Nominal Yield']
  },

  // ETFs
  'S&P 500 ETF': {
    industry: 'Equity Index Fund',
    explanation: 'Exchange-traded fund tracking the S&P 500 index, investing in the 500 largest U.S. public companies. Provides instant market diversification.',
    financialFactors: [
      'Market Risk: Linked to overall stock market performance',
      'Economic Growth: GDP growth drives corporate earnings',
      'Interest Rate Policy: Low rates generally favor stocks',
      'Corporate Earnings: Quarterly results of constituent companies'
    ],
    keyMetrics: ['P/E Ratio', 'Dividend Yield', 'Expense Ratio']
  },
  'Real Estate ETF': {
    industry: 'Real Estate Investment Trusts',
    explanation: 'ETF investing in real estate-related securities, including REITs. Provides real estate market exposure without direct property ownership.',
    financialFactors: [
      'Interest Rate Sensitivity: Low rates favor real estate values',
      'Rental Income: Stable cash flow source',
      'Real Estate Cycle: Supply and demand affect prices',
      'Geographic Distribution: Different regional market performance'
    ],
    keyMetrics: ['FFO (Funds From Operations)', 'Occupancy Rate', 'Cap Rate']
  },
  'International ETF': {
    industry: 'Global Equity Fund',
    explanation: 'Invests in stock markets outside the United States, providing global diversification and emerging market growth opportunities.',
    financialFactors: [
      'Currency Risk: Foreign currency fluctuations vs. USD',
      'Geopolitics: International relations and political stability',
      'Economic Growth: GDP growth rate differences by country',
      'Regulatory Environment: Different policies and regulations per country'
    ],
    keyMetrics: ['Regional Allocation', 'Currency Exposure', 'Expense Ratio']
  },
  'Gold ETF': {
    industry: 'Precious Metals Commodity Fund',
    explanation: 'ETF tracking gold prices. Gold is viewed as a safe-haven asset and inflation hedge, often performing well during uncertain times.',
    financialFactors: [
      'Safe-Haven Demand: Investors flock to gold during crises',
      'Dollar Strength: Dollar depreciation typically boosts gold prices',
      'Real Interest Rates: Negative real rates favor gold',
      'Central Bank Purchases: Gold reserve policies of various countries'
    ],
    keyMetrics: ['Spot Price', 'Storage Costs', 'Inflation Correlation']
  },
  'Emerging Market ETF': {
    industry: 'Emerging Markets Fund',
    explanation: 'Invests in ETFs focused on developing country markets like China, India, Brazil. High risk, high reward, suitable for long-term investment.',
    financialFactors: [
      'Economic Growth: Emerging markets have faster GDP growth',
      'Currency Risk: Higher volatility in local currencies',
      'Political Risk: Policy changes and political instability',
      'Market Liquidity: Relatively lower than developed markets'
    ],
    keyMetrics: ['Country Weights', 'P/E Ratio', 'Liquidity Indicators']
  },

  // Individual Stocks
  'Tech Stock': {
    industry: 'Technology Sector',
    explanation: 'Stocks of technology companies including software, hardware, internet services. High growth potential but high volatility.',
    financialFactors: [
      'Innovation Capacity: R&D investment and product innovation',
      'Market Share: Competitive position and user growth',
      'Profitability: Revenue growth and profit margins',
      'Valuation Levels: Tech stocks typically command high valuation multiples'
    ],
    keyMetrics: ['P/S Ratio (Price-to-Sales)', 'User Growth Rate', 'R&D Spending Ratio']
  },
  'Blue Chip Stock': {
    industry: 'Large-Cap Established Companies',
    explanation: 'Stocks of large, stable, well-regarded public companies. Financially healthy, stable earnings, typically pay dividends.',
    financialFactors: [
      'Stability: Low earnings volatility, strong risk resilience',
      'Dividend Payments: Regular dividends provide cash flow',
      'Market Position: Industry leaders with high brand value',
      'Defensive Nature: Relatively better performance during recessions'
    ],
    keyMetrics: ['Dividend Yield', 'ROE (Return on Equity)', 'Free Cash Flow']
  },
  'Dividend Stock': {
    industry: 'High-Dividend Yield Stocks',
    explanation: 'Company stocks that pay regular, high dividends. Suitable for investors seeking stable income, typically mature businesses.',
    financialFactors: [
      'Dividend Policy: Company\'s dividend history and commitment',
      'Cash Flow: Sufficient cash flow to support dividends',
      'Payout Ratio: Dividends as percentage of earnings',
      'Dividend Growth: Ability to continuously raise dividends'
    ],
    keyMetrics: ['Dividend Yield', 'Payout Ratio', 'Dividend Growth Rate']
  },
  'Energy Stock': {
    industry: 'Energy Sector',
    explanation: 'Invests in oil, natural gas, and renewable energy companies. Significantly affected by commodity prices and energy demand.',
    financialFactors: [
      'Oil Price Volatility: Crude oil and natural gas price trends',
      'Supply and Demand: Global energy supply and demand balance',
      'Geopolitics: Political situation in oil-producing countries',
      'Energy Transition: Shift towards clean energy'
    ],
    keyMetrics: ['Oil Price', 'Reserves', 'Production Costs']
  },
  'Healthcare Stock': {
    industry: 'Healthcare Sector',
    explanation: 'Invests in pharmaceutical, medical device, healthcare service companies. Relatively defensive, supported by long-term trends like aging demographics.',
    financialFactors: [
      'Drug Pipeline: Drug development and approval progress',
      'Regulatory Policy: Healthcare policy and drug pricing',
      'Demographics: Aging population drives demand growth',
      'Patent Protection: Intellectual property and exclusivity periods'
    ],
    keyMetrics: ['R&D Pipeline', 'Patent Expiry Dates', 'Profit Margins']
  },
  'Value Stock': {
    industry: 'Value Stocks',
    explanation: 'Stocks undervalued relative to their intrinsic worth. Investors seek market mispricing opportunities, waiting for value realization.',
    financialFactors: [
      'Low Valuation: P/E, P/B ratios below market average',
      'Fundamentals: Solid financial foundation',
      'Market Sentiment: Improving investor sentiment can drive valuation repair',
      'Cyclical Nature: Often outperform during economic recovery'
    ],
    keyMetrics: ['P/B Ratio (Price-to-Book)', 'P/E Ratio', 'EV/EBITDA']
  },
  'Small Cap Stock': {
    industry: 'Small-Cap Stocks',
    explanation: 'Stocks of companies with smaller market capitalization (typically <$2B). High growth potential but high risk, relatively low liquidity.',
    financialFactors: [
      'Growth Potential: Large development space, high flexibility',
      'Market Attention: Less analyst coverage, lower pricing efficiency',
      'Financing Needs: High dependence on external financing',
      'Economic Sensitivity: More sensitive to economic cycles'
    ],
    keyMetrics: ['Revenue Growth Rate', 'Market Cap', 'Trading Volume']
  },
  'Consumer Stock': {
    industry: 'Consumer Goods Sector',
    explanation: 'Companies producing and selling everyday consumer goods. Includes consumer staples (food, household items) and discretionary (luxury, entertainment).',
    financialFactors: [
      'Consumer Confidence: Consumer spending willingness',
      'Brand Power: Brand value and customer loyalty',
      'Retail Channels: Online and offline sales networks',
      'Income Levels: Changes in household disposable income'
    ],
    keyMetrics: ['Same-Store Sales Growth', 'Brand Value', 'Gross Margin']
  },

  // Cryptocurrencies
  'Bitcoin': {
    industry: 'Cryptocurrency',
    explanation: 'The first and largest cryptocurrency based on blockchain technology. Viewed as "digital gold" with limited supply (21 million coins).',
    financialFactors: [
      'Supply and Demand: Fixed supply vs. growing demand',
      'Institutional Adoption: Acceptance by institutional investors and corporations',
      'Regulatory Environment: Cryptocurrency policies of various governments',
      'Technology Development: Blockchain technology and network security',
      'Market Sentiment: Highly speculative, sentiment-driven'
    ],
    keyMetrics: ['Market Cap', 'Trading Volume', 'Active Addresses', 'Hash Rate']
  },
  'Ethereum': {
    industry: 'Smart Contract Platform',
    explanation: 'The second-largest cryptocurrency, not just a payment tool but a platform for decentralized applications (DApps). Supports smart contracts and DeFi.',
    financialFactors: [
      'DeFi Ecosystem: Growth of decentralized finance applications',
      'NFT Market: Digital art and collectibles trading',
      'Network Upgrades: ETH 2.0 and technical improvements',
      'Gas Fees: Network congestion and transaction costs',
      'Competing Platforms: Challenges from other smart contract platforms'
    ],
    keyMetrics: ['TVL (Total Value Locked)', 'Gas Prices', 'Number of DApps']
  },
  'Altcoin Portfolio': {
    industry: 'Alternative Cryptocurrencies',
    explanation: 'Portfolio of cryptocurrencies other than Bitcoin. Includes various projects like Layer1, DeFi tokens, meme coins, etc. Extremely high risk.',
    financialFactors: [
      'Project Fundamentals: Technical strength and team background',
      'Market Cycles: Bull and bear cycles in cryptocurrency',
      'Bitcoin Dominance: BTC market cap percentage affects altcoins',
      'Liquidity Risk: Small coins easily manipulated',
      'Project Survival: Many projects may go to zero'
    ],
    keyMetrics: ['Market Cap Ranking', 'Circulating Supply', 'Community Activity']
  },
  'DeFi Token': {
    industry: 'Decentralized Finance Token',
    explanation: 'Governance and utility tokens of DeFi protocols. Represents stakes in decentralized lending, exchanges, stablecoins, and other financial services.',
    financialFactors: [
      'Protocol Revenue: Actual fees and income generated',
      'TVL Changes: Amount of assets locked in the protocol',
      'Smart Contract Risk: Code vulnerabilities and hacker attacks',
      'Regulatory Pressure: Government attitude towards DeFi regulation',
      'Yield Opportunities: APY from mining and staking'
    ],
    keyMetrics: ['TVL', 'Protocol Revenue', 'Token Distribution', 'User Count']
  },

  // Mutual Funds
  'Growth Mutual Fund': {
    industry: 'Growth Mutual Fund',
    explanation: 'Actively managed fund by professional managers, investing in high-growth potential companies. Goal is capital appreciation rather than current income.',
    financialFactors: [
      'Active Management: Manager\'s stock-picking ability and strategy',
      'Expense Ratio: Management fees erode returns',
      'Track Record: Historical returns and risk-adjusted performance',
      'Asset Size: Excessive size may affect flexibility'
    ],
    keyMetrics: ['Expense Ratio', 'Sharpe Ratio', 'Alpha vs. Benchmark']
  },
  'Balanced Fund': {
    industry: 'Balanced Mutual Fund',
    explanation: 'Hybrid fund investing in both stocks and bonds. Typically 60% stocks, 40% bonds, seeking balance between returns and risk.',
    financialFactors: [
      'Asset Allocation: Adjustment of stock-bond ratio',
      'Market Environment: Relative performance of stock and bond markets',
      'Rebalancing Strategy: Periodic adjustment of holdings',
      'Risk Management: Lower volatility than pure equity funds'
    ],
    keyMetrics: ['Stock-Bond Ratio', 'Standard Deviation', 'Maximum Drawdown']
  },
  'Index Mutual Fund': {
    industry: 'Index Mutual Fund',
    explanation: 'Passively tracks a specific market index. Low fees, suitable for long-term investment, reflects average market returns.',
    financialFactors: [
      'Tracking Error: Degree of deviation from index',
      'Cost Advantage: Extremely low fees compared to active funds',
      'Market Efficiency: Difficult to beat the market long-term',
      'Tax Efficiency: Low trading, low capital gains tax'
    ],
    keyMetrics: ['Expense Ratio', 'Tracking Error', 'Assets Under Management']
  }
};