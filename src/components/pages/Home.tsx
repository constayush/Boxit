"use client"

import { useEffect } from "react"
import { Link } from "react-router"
import FightCards from "../ui/FightCards"
import { Trophy, Calendar, MapPin, Users } from "lucide-react"

export default function Home() {
  const demoFights = [
    {
      title: "Usyk vs Fury II",
      date_str: "Saturday, 21 December 2024",
      location: "Kingdom Arena, Riyadh, Saudi Arabia",
      status: "NOT_STARTED",
      scheduled_rounds: 12,
      fighter_1: {
        name: "Oleksandr Usyk",
        age: 37,
        nationality: "Ukraine",
        stance: "Southpaw (L)",
        wins: 22,
        losses: 0,
        ko_percentage: 64,
      },
      fighter_2: {
        name: "Tyson Fury",
        age: 36,
        nationality: "United Kingdom",
        stance: "Orthodox (R)",
        wins: 34,
        losses: 1,
        ko_percentage: 71,
      },
    },
    {
      title: "Usyk vs Fury II",
      date_str: "Saturday, 21 December 2024",
      location: "Kingdom Arena, Riyadh, Saudi Arabia",
      status: "NOT_STARTED",
      scheduled_rounds: 12,
      fighter_1: {
        name: "Oleksandr Usyk",
        age: 37,
        nationality: "Ukraine",
        stance: "Southpaw (L)",
        wins: 22,
        losses: 0,
        ko_percentage: 64,
      },
      fighter_2: {
        name: "Tyson Fury",
        age: 36,
        nationality: "United Kingdom",
        stance: "Orthodox (R)",
        wins: 34,
        losses: 1,
        ko_percentage: 71,
      },
    },
    {
      title: "Usyk vs Fury II",
      date_str: "Saturday, 21 December 2024",
      location: "Kingdom Arena, Riyadh, Saudi Arabia",
      status: "NOT_STARTED",
      scheduled_rounds: 12,
      fighter_1: {
        name: "Oleksandr Usyk",
        age: 37,
        nationality: "Ukraine",
        stance: "Southpaw (L)",
        wins: 22,
        losses: 0,
        ko_percentage: 64,
      },
      fighter_2: {
        name: "Tyson Fury",
        age: 36,
        nationality: "United Kingdom",
        stance: "Orthodox (R)",
        wins: 34,
        losses: 1,
        ko_percentage: 71,
      },
    },
  ]

  useEffect(() => {
    const url = "https://boxing-data-api.p.rapidapi.com/v1/divisions/"
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "boxing-data-api.p.rapidapi.com",
      },
    }

    try {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white ">

      {/* Hero Section */}
      <div className="container relative flex flex-col items-center px-4 md:px-12 my-12 md:my-24">
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-[10rem] font-bold mb-3 helvetica-font">
            Box'<span className="text-red-600">it.</span>
          </h1>
          <p className="text-xl md:text-3xl mb-12 text-gray-300">Your Ultimate Boxing Guide! – Train, Learn, and Stay Updated!</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
            <Link to="/select">
              <button className="w-full sm:w-auto border border-white/70 bg-black hover:bg-red-600 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium tracking-wide hover:tracking-wider">
                Practice
              </button>
            </Link>
            <Link to="/learn" className="">
              <button
                className="w-full sm:w-auto border border-white/30 bg-gray-800/50 hover:bg-red-600 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium tracking-wide hover:tracking-wider"
                
              >
                Learn
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          <div className="bg-gray-900/70 p-6 rounded-xl flex flex-col items-center text-center">
            <Trophy className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Pro Techniques</h3>
            <p className="text-gray-400">Learn boxing techniques from professional fighters</p>
          </div>
          <div className="bg-gray-900/70 p-6 rounded-xl flex flex-col items-center text-center">
            <Calendar className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fight Calendar</h3>
            <p className="text-gray-400">Stay updated with upcoming boxing matches</p>
          </div>
          <div className="bg-gray-900/70 p-6 rounded-xl flex flex-col items-center text-center">
            <Users className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fighter Stats</h3>
            <p className="text-gray-400">Detailed statistics on your favorite boxers</p>
          </div>
        </div>
      </div>

      {/* Fights Section */}
      <div className="container cursor-not-allowed px-4 md:my-24 my-12 md:px-12">
        <div className="flex items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Upcoming Fights</h2>
          <div className="h-1 flex-grow ml-8 bg-red-600 rounded-full"></div>
        </div>

        {/* Grid for Fight Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoFights && demoFights.map((fight, index) => <FightCards key={index} fight={fight} />)}
        </div>

        <div className="mt-12 text-center">
          <button className="border border-white/30 bg-transparent hover:bg-red-600 transition-all duration-300 rounded-xl py-3 px-6 text-lg font-medium">
            View All Fights
          </button>
        </div>
      </div>

      {/* Player Stats Section */}
      <div className="container cursor-not-allowed px-4 md:my-24 my-12 md:px-12">
        <div className="flex items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Top Fighters</h2>
          <div className="h-1 flex-grow ml-8 bg-red-600 rounded-full"></div>
        </div>

        {/* Grid for Player Stats */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Fighter 1 */}
          <div className="bg-gray-900/70 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Oleksandr Usyk</h3>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">Heavyweight</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Ukraine</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">22</p>
                  <p className="text-sm text-gray-400">Wins</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="text-sm text-gray-400">Losses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">64%</p>
                  <p className="text-sm text-gray-400">KO</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span className="font-medium">37</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stance</span>
                  <span className="font-medium">Southpaw (L)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fighter 2 */}
          <div className="bg-gray-900/70 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Tyson Fury</h3>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">Heavyweight</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>United Kingdom</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">34</p>
                  <p className="text-sm text-gray-400">Wins</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">1</p>
                  <p className="text-sm text-gray-400">Losses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">71%</p>
                  <p className="text-sm text-gray-400">KO</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span className="font-medium">36</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stance</span>
                  <span className="font-medium">Orthodox (R)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fighter 3 */}
          <div className="bg-gray-900/70 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Canelo Alvarez</h3>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Super Middleweight
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Mexico</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">61</p>
                  <p className="text-sm text-gray-400">Wins</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">2</p>
                  <p className="text-sm text-gray-400">Losses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">67%</p>
                  <p className="text-sm text-gray-400">KO</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Age</span>
                  <span className="font-medium">33</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stance</span>
                  <span className="font-medium">Orthodox (R)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="border border-white/30 bg-transparent hover:bg-red-600 transition-all duration-300 rounded-xl py-3 px-6 text-lg font-medium">
            View All Fighters
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full cursor-not-allowed bg-gradient-to-b from-black to-gray-900 p-24 ">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Step in the Ring?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of boxing enthusiasts and improve your skills today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/select">
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-bold">
                Get Started
              </button>
            </Link>
            <a href="#" className="cursor-pointer">
              <button className="w-full sm:w-auto border border-white/70 bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

