import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signIn, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useAppwrite(
    () => getUserPosts(user.$id)
  );

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard
            video={item}
          />
        )}

        
        ListHeaderComponent={() => (
          
          // <View className="my-6 px-4">

          //    {/* khung chu chao mung gioi thieu */}
          //       <View>
          //         <Text className="font-pmedium text-sm text-gray-100">
          //           Search Results 
          //         </Text>
          //         <Text className="text-2xl font-psemibold text-white">
          //           {/* {query} */}
          //         </Text>

          //         <View className='mt-6 mb-8'>
          //           {/* <SearchInput initialQuery={query} /> */}
          //         </View>
          //       </View> 
          // </View>
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            {/* avatar cho user  */}
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
               <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover' 
               />
            </View>

            {/* khung info cua user  */}
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row' >
              <InfoBox
                title={posts.length || 0}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title="2.2k"
                subtitle="Followers"
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}

        //Thuc hien chuc nang khi khong co video nao
        ListEmptyComponent={() => (
          <EmptyState
            title = 'No video found'
            subtitle = 'No videos found for this search query'
          />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile