import React from "react"
import TypingCard from "@/components/TypingCard"
import wechat from "@/assets/images/wechat.jpg"
import reward from "@/assets/images/reward.jpg"
const About = () => {
  const cardContent = `
    <p>Hello everyone, this is Admin. </p>
    <p>A code farmer under the Zhongnan Mountain, under the tutelage of Taoist Wang Chongyang, loves coding, advocates the spirit of open source, and is willing to share. </p>
    <p>In 2005, he served as a sniper in the Spike Special Brigade of the Southeast Theater of the Chinese People's Liberation Army. </p>
    <p>In 2008, I was invited by the Russian Alpha Special Forces to teach in the first brigade of the Special Forces to teach its members the theory of socialism with Chinese characteristics and Mao Zedong Thought. </p>
    <p>In 2011, he lost the election for the president of the United States, so he was discouraged, put down all the honors, and lived in seclusion at the bottom of Zhongnan Mountain. </p>
    <p>In 2015, he was commissioned by Taoist Chief Wang Chongyang to develop an incense management system for Taoist temples, so he indulged in IT and couldn't help himself. </p>
    <p>I like tossing and playing games, pursuing fresh technology. </p>
    <p>Below is my WeChat, welcome to tree (new) bee with good friends! ! ! </p>
    <p>If you think this project is a little helpful to you, please appreciate it. </p>
    <p>Your appreciation is my driving force for continuous progress! </p>
    <p>Ps: Recently, many friends have added me to WeChat to ask me some questions, but they didn’t even give me a star after asking, so I’m so heartbroken~~~</p>
    <p>I beg you to point a star, thank you~~</p>
    <img src="${wechat}" alt="wechat" style="height:550px"/>
    <img src="${reward}" alt="reward" style="height:550px"/>
  `
  return (
    <div className="app-container">
      <TypingCard title="About the author" source={cardContent} />
    </div>
  )
}

export default About
