import { useEffect, useState } from 'react'

const Ip = () => {
    const [ip, setIp] = useState('');
    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        };
        fetchIp();
    }, []);
  return (
    <div>
        <h1 className='text-2xl'>Ip Address: {ip}</h1>
      
    </div>
  )
}

export default Ip
