const API_KEY = '556cfa55ef92fa6032452f78fd8b603e';

export async function getClima(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        if(data.cod === 200) {
            return data;
        }
        return null;
    } catch (error){
        throw new Error('Erro', error);
    } 
} 
