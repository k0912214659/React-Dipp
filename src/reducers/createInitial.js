import Global from '@Models/Global';
import Message from '@Models/Message';
import Weather from '@Models/Weather';
import User from '@Models/User';
import AD from '@Models/AD';

async function createInitial(param) {
  return {
    global: new Global(param),
    message: new Message(),
    weather: new Weather(),
    user: new User(),
    ad: new AD(),
  };
}

export default createInitial;
