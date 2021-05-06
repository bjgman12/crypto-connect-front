
import Coin from "./Coins"

export default function CoinListed({filteredCoins}){

    return (
        <>
        {filteredCoins.map(coin => {
            return (<Coin

            key={coin.id}
            name={coin.name}
            id={coin.id}
            price = {coin.current_price}
            symbol = {coin.symbol}
            maketcap = {coin.market_cap}
            image = {coin.image}
            priceChange = {coin.price_change_percentage_24h}
            />)
            })}
        </>
    )
}

