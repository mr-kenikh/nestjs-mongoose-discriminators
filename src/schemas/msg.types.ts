import { MsgAlert } from './msg.alert.schema';
import { MsgInfo } from './msg.info.schema';
import { MsgWarn } from './msg.warn.schema';

export enum MsgType {
  Alert = 'alert',
  Info = 'info',
  Warn = 'warn',
}

export type MsgUnion = MsgAlert | MsgInfo | MsgWarn;
