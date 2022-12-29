import Head from "next/head";

import React from "react";
import { useState } from "react";

import styles from "../styles/home.module.css";
import Image from "next/image";

export default function Home() {
  const [gender, setGender] = useState("man")
  const [age, setAge] = useState("30")
  const [priceMin, setPriceMin] = useState("50000")
  const [priceMax, setPriceMax] = useState("150000")
  const [hobbies, setHobbies] = useState("")
  const [loading, setLoading] = useState(false);


  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replaceAll('\n', '<br />'));
      setLoading(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Eid gift generator</title>
        <link rel="icon" href="/EidGifts.png" />
      </Head>

      <main className="flex flex-col w-full items-center">
        <img
            src="/EidGifts.png"
            className={styles.icon}
            alt={"Eid Gifts Icon"}
            width={100}
            height={100}
        />
        <h3 className="text-4xl">Eid gift generator</h3>
          <form onSubmit={onSubmit} className="bg-amber-50 my-4 p-4 rounded rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              {/* input 2 column */}
                <div className="flex-1 bg-green-100 rounded rounded-xl">
                    <div className="flex flex-col p-2 m-2">
                      <label htmlFor="price" className="text-gray-700 dark:text-gray">
                        For who is the gift?
                      </label>
                      <select
                          className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 h-8 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                      </select>
                    </div>
                </div>
              <div className="flex-1 bg-green-100 rounded rounded-xl">
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="price" className="text-gray-700 dark:text-gray">
                        Age
                    </label>
                    <input
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 h-8 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="number"
                        min={1}
                        max={99}
                        name="age"
                        placeholder="Enter the age"
                        value={age}
                        onChange={(e) => setAge(Number.parseInt(e.target.value))}
                    />
                </div>
              </div>
              <div className="flex-1 bg-green-100 rounded rounded-xl">
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="price" className="text-gray-700 dark:text-gray">
                        Price from
                    </label>
                    <input
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 h-8 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="number"
                        min={1}
                        name="priceMin"
                        placeholder="Enter the minimum price"
                        value={priceMin}
                        onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
                    />
                </div>
              </div>
                <div className="flex-1 bg-green-100 rounded rounded-xl">
                    <div className="flex flex-col p-2 m-2">
                        <label htmlFor="price" className="text-gray-700 dark:text-gray">
                            Price to
                        </label>
                        <input
                            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 h-8 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            type="number"
                            min={1}
                            name="priceMax"
                            placeholder="Enter the maximum price"
                            value={priceMax}
                            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </div>
              <div className="flex-1 bg-green-100 rounded rounded-xl mt-4">
                  <div className="flex flex-col p-2 m-2">
                      <label htmlFor="price" className="text-gray-700 dark:text-gray">
                          Hobbies
                      </label>
                      <input
                          className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 h-8 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          type="text"
                          name="hobbies"
                          placeholder="Enter the hobbies"
                          value={hobbies}
                          onChange={(e) => setHobbies(e.target.value)}
                      />
                  </div>
              </div>
            <div className="flex justify-center py-4">
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                  disabled={loading}
              >
                  Generate gift ideas
              </button>
            </div>
          </form>
        {loading && (
            <div className="flex justify-center">
              <h3>Looking for the best gift ideas 🎁 💡</h3>
              <Image
                  src="/loading-green.gif"
                  alt="Loading"
                  width={25}
                  height={25}
              />
            </div>
        )}
          {result && (
              <div
                  className="bg-green-100 rounded rounded-xl p-4 w-full sm:w-2/3 mx-4 mb-4"
                  dangerouslySetInnerHTML={{ __html: result }}
              />
          )}

      </main>
    </div>
  );
}
