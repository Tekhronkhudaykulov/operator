export {};

declare global {
  interface Window {
    electron: {
      setStoreValue: (key: string, value: any) => Promise<any>;
      getStoreValue: (key: string) => Promise<any>;
    };
  }
}
