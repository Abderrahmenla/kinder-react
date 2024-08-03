export const isOrganicSearch = (): boolean => {
  const getLocation = (url: string): HTMLAnchorElement => {
    const location = document.createElement('a');
    location.href = url;
    return location;
  };

  const isSearchEngine = (): boolean => {
    const referrerLocation = getLocation(document.referrer);
    const searchEnginesPatterns: string[] = [
      'www.google.',
      'www.baidu.',
      'www.duckduckgo.',
      'www.bing.',
      'www.yahoo.',
      'www.yandex.'
    ];
    const isFromSearchEngine: boolean = searchEnginesPatterns.some((pattern) =>
      referrerLocation.hostname.includes(pattern)
    );
    const hasValidPath: boolean = ['/search', '/url', '', '/'].includes(referrerLocation.pathname);

    return isFromSearchEngine && hasValidPath;
  };

  const urlLocation = getLocation(document.location.href);
  const hasNonOrganicParameters: boolean = /(^\?|&)(gclid|utm_.+)=/.test(urlLocation.search);

  return isSearchEngine() && !hasNonOrganicParameters;
};
