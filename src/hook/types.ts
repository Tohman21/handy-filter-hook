import { CheckableValue } from 'handy-filter';

export interface HookOptions {
  join?: 'and' | 'or';
}

export interface HookProps {
  init?: CheckableValue[];
  options?: HookOptions
}
