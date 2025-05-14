import { View, Pressable, Image, Dimensions } from 'react-native'
import { useState } from 'react'
import IndividualPost from './IndividualPost'

const { width } = Dimensions.get('window')
const sidePadding = 32
const imageGap = 8
const imageSize = (width - sidePadding - imageGap * 2) / 3

export default function ImageGrid({ images }) {
  const [modalData, setModalData] = useState(null)

  const numColumns = 3
  const totalGridItems = Math.ceil(images.length / numColumns) * numColumns

  const topLeft = 0
  const topRight = numColumns - 1
  const bottomLeft = totalGridItems - numColumns
  const bottomRight = totalGridItems - 1

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {images
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((img, index) => {
          const rounding = [
            index === topLeft ? 'rounded-tl-2xl' : '',
            index === topRight ? 'rounded-tr-2xl' : '',
            index === bottomLeft ? 'rounded-bl-2xl' : '',
            index === bottomRight ? 'rounded-br-2xl' : ''
          ].join(' ')

          const isRight = (index + 1) % numColumns === 0

          return (
            <Pressable
              key={img.id}
              onPress={() => setModalData(img)}
              style={{
                width: imageSize,
                height: imageSize,
                marginBottom: imageGap,
                marginRight: isRight ? 0 : imageGap
              }}
              className={rounding}
            >
              <Image
                source={img.uri}
                style={{ width: '100%', height: '100%' }}
                className={rounding}
              />
            </Pressable>
          )
        })}
      {modalData && (
        <IndividualPost
          image={modalData}
          closeModal={() => setModalData(null)}
        />
      )}
    </View>
  )
}

