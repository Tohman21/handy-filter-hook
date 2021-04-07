export interface HookOptions {
  join?: 'and' | 'or';
}

export interface HookProps {
  init?: any;
  options?: HookOptions
}
