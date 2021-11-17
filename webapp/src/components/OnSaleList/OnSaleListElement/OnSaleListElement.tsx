import React from 'react'
import { Table } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { NFTCategory } from '@dcl/schemas'
import { Mana } from '../../Mana'
import { formatMANA } from '../../../lib/mana'
import { Props } from './OnSaleListElement.types'
import { AssetImage } from '../../AssetImage'
import styles from './OnSaleListElement.module.css'

const OnSaleListElement = ({ nft, item, order }: Props) => {
  const category = item?.category || nft!.category

  let subtitle: string | undefined

  switch (category) {
    case NFTCategory.ESTATE:
      subtitle = t('global.parcel_count', {
        count: nft!.data.estate!.parcels.length
      })
      break
    case NFTCategory.PARCEL:
      const { x, y } = nft!.data.parcel!
      subtitle = `${x},${y}`
  }

  return (
    <Table.Row>
      <Table.Cell>
        <div className={styles.firstCell}>
          <div className={styles.imageContainer}>
            <AssetImage asset={item || nft!} isSmall />
          </div>
          <div>
            <div className={styles.title}>{item?.name || nft!.name}</div>
            {subtitle && <div>{subtitle}</div>}
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>{t(`global.${category}`)}</Table.Cell>
      <Table.Cell>{t(`global.${item ? 'primary' : 'secondary'}`)}</Table.Cell>
      <Table.Cell>
        <Mana network={item?.network || nft!.network} inline>
          {formatMANA(item?.price || order!.price)}
        </Mana>
      </Table.Cell>
    </Table.Row>
  )
}

export default React.memo(OnSaleListElement)
