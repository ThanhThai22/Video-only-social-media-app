import { View, Text, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()

  const { data: posts, refetch } = useAppwrite(
    () => searchPosts(query)
  );

  // console.log(query, posts);

  useEffect(() => {
    refetch()
  }, [query])

  // console.log(posts)

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
          
          <View className="my-6 px-4">

             {/* khung chu chao mung gioi thieu */}
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search Results 
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">{query}</Text>

                  <View className='mt-6 mb-8'>
                    <SearchInput initialQuery={query} />
                  </View>
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

        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}

export default Search