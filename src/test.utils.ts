import { MsgType } from './schemas/msg.types';
import { MsgAlert } from './schemas/msg.alert.schema';
import { MsgInfo } from './schemas/msg.info.schema';
import { MsgWarn } from './schemas/msg.warn.schema';

export const tests = [
  {
    raw: <MsgAlert>{
      action: 'wipe',
      instance_id: '0',
      type: MsgType.Alert,
    },

    expected: <MsgAlert>{
      action: 'wipe',
      instance_id: 0, // cast expected
      type: MsgType.Alert,
    },

    discriminatorMapping: (isRoot: boolean) => ({
      key: 'type',
      value: MsgType.Alert,
      isRoot,
    }),
  },

  {
    raw: <MsgInfo>{
      info: 'success',
      type: MsgType.Info,
    },

    expected: <MsgInfo>{
      info: 'success',
      type: MsgType.Info,
    },

    discriminatorMapping: (isRoot: boolean) => ({
      key: 'type',
      value: MsgType.Info,
      isRoot,
    }),
  },

  {
    raw: <MsgWarn>{
      data: 'data',
      type: MsgType.Warn,
    },

    expected: <MsgWarn>{
      data: 'data',
      type: MsgType.Warn,
    },

    discriminatorMapping: (isRoot: boolean) => ({
      key: 'type',
      value: MsgType.Warn,
      isRoot,
    }),
  },
];
