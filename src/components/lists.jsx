// import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './lists.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, setDirections } from '../store/slices/directions'
import { setCoins, setSecondCat } from '../store/slices/coins'
import { setFilters, setToCoins } from '../store/slices/filters'
import arrow from '../assets/img/icon.png'

const Lists = () => {
  const categories = [
    'Все',
    'Криптовалюты',
    'Наличные',
    'Банки RUB',
    'Банки UAH',
  ]

  const [isOnFrom, setIsOnFrom] = useState(false)
  const [isOnTo, setIsOnTo] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState('---')
  const [selectedCoinInTo, setSelectedCoinInTo] = useState('---')

  const spanRef = useRef()

  const directions = useSelector((state) => state.directions.directions)
  const coins = useSelector((state) => state.coins.coins)
  const filteredCoins = useSelector((state) => state.filters.filteredCoins)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCoins(filteredCoins))
  }, [filteredCoins])

  useEffect(() => {
    dispatch(setDirections())
    dispatch(setFilters())
  }, [])

  useEffect(() => {
    setSelectedCoin(directions[0]?.code)
  }, [directions])

  // useEffect(() => {
  //   if (filteredCoins) setSelectedCoin(filteredCoins[0]?.code)
  //   console.log(filteredCoins[0]?.code)
  // }, [filteredCoins])

  const handleToggleFrom = () => {
    setIsOnFrom((prev) => !prev)
  }
  const handleToggleTo = () => {
    setIsOnTo((prev) => !prev)
  }

  const handleSelectCoin = (coin) => {
    console.log(coin)
    setSelectedCoin(coin.slice(0, 5))
    setIsOnFrom((prev) => !prev)
    dispatch(setToCoins(coin))
    setIsOnTo(false)
    dispatch(setCoins(filteredCoins))
  }

  const handleSelectCoinTo = (coin) => {
    setSelectedCoinInTo(coin.slice(0, 4))
    setIsOnTo((prev) => !prev)
  }

  const selectCat = (cat) => {
    dispatch(selectCategories(cat))
    setSelectedCoin('---')
    setSelectedCoinInTo('---')
    setIsOnTo(false)
    setIsOnFrom(false)
  }

  const handleSelectSecondCat = (cat) => {
    dispatch(setSecondCat(filteredCoins, cat))
  }

  return (
    <div className={styles.lists}>
      <div className={styles.lists_from}>
        <h3>Отдаете</h3>
        <ul>
          {categories.map((cat) => (
            <li onClick={() => selectCat(cat)} key={cat}>
              {cat}
            </li>
          ))}
        </ul>
        <div className={styles.lists_from__input}>
          <input type="text" />
          <span className={styles.coin}>
            <b onClick={handleToggleFrom}>{selectedCoin}</b>
            {isOnFrom && (
              <span ref={spanRef} className={styles.isOn}>
                {directions.map((item) => {
                  return (
                    <li
                      key={item.code}
                      onClick={() => handleSelectCoin(item.code)}
                    >
                      {item.name}
                    </li>
                  )
                })}
              </span>
            )}
          </span>
        </div>
      </div>
      <div className={styles.lists_average}>
        <img src={arrow} />
      </div>
      {/* -------------------------------------------------- */}
      <div className={styles.lists_to}>
        <h3>Получаете</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat} onClick={() => handleSelectSecondCat(cat)}>
              {cat}
            </li>
          ))}
        </ul>
        <div className={styles.lists_from__input}>
          <input type="text" />
          <span className={styles.coin}>
            <b onClick={handleToggleTo}>{selectedCoinInTo}</b>
            {isOnTo && (
              <span className={styles.isOn}>
                {coins.map((item) => {
                  return (
                    <li
                      key={item.code}
                      onClick={() => handleSelectCoinTo(item.code)}
                    >
                      {item.code}
                    </li>
                  )
                })}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Lists
