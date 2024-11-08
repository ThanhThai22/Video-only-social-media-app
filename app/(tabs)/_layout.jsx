import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icon, icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className={`${focused ? 'items-center justify-center gap-2.5 mb-3' : 'items-center justify-center gap-1.5 mb-2'}`}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className={`${focused ? 'w-7 h-7' : 'w-6 h-6'}`}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ 
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 82,
          }
         }}
      >
      {/* home  */}
        <Tabs.Screen 
          name="home"
          options={{ 
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
           }}
        />
        {/* bookmark */}
        {/* <Tabs.Screen 
          name="bookmark"
          options={{ 
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            )
           }}
        /> */}
        {/* create  */}
        <Tabs.Screen 
          name="create"
          options={{ 
            title: "Create",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            )
           }}
        />
        {/* save  */}
        <Tabs.Screen 
          name="profile"
          options={{ 
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
           }}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout