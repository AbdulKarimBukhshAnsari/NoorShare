import { Text, View } from 'react-native'
import Header from '../../components/app/Header'
import ImageGrid from '../../components/profile/ImageGrid'
import { sharedImageData } from '../../constants/sharedImageData'
import MonthGrid from '../../components/profile/MonthGrid'
import SectionBox from '../../components/app/SectionBox'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfilePage () {
    return (
      <SafeAreaView className="flex-1 bg-white items-center">
        <Header version={3}></Header>
        <SectionBox text="Shared Images"/>
        <MonthGrid images={sharedImageData}/>
      </SafeAreaView>
    )
  }

