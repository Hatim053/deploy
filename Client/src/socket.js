import io from 'socket.io-client'

const socket = io(`${import.meta.env.VITE_SERVER_SIDE_URL}`);


export default socket