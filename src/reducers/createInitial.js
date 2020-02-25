import Global from '@Models/Global';
import Message from '@Models/Message';

async function createInitial(param) {
  return {
    global: new Global(param),
    message: new Message(),
  };
}

export default createInitial;
