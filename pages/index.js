import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import useCopyToClipboard from './useCopyToClipboard';

const sortFn = (a, b) => {
  const abbrA = a.abbr.toLowerCase();
  const abbrB = b.abbr.toLowerCase();
  if (abbrA > abbrB) {
    return 1;
  } else if (abbrA < abbrB) {
    return -1;
  }
  return 0;
};

export default function Home() {
  const [data, setData] = useState([]);
  const [_, setClipboard] = useCopyToClipboard();
  const inputRef = useRef(null);

  const fetchData = () => {
    fetch('/data.json')
      .then(response => response.json())
      .then((response) => {
        const sortedData = response.data.sort(sortFn);
        setData(sortedData);
      });
  };

  useEffect(() => {
    inputRef.current?.focus();
    fetchData();
  }, []);

  const onKeyUp = (event) => {
    const value = event.target.value;

    if (!value.length) {
      fetchData();
      return;
    }

    const searchText = String(value).toLowerCase();
    const searchResult = data.filter(
      ({ abbr, desc }) => abbr.toLowerCase().includes(searchText) || desc.toLowerCase().includes(searchText)
    );
    setData(searchResult);
  };

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Abbr's for people WFH"
        description="Abbreviation's for people who is working from home."
        canonical="https://wfh-abbrs.vercel.app"
        openGraph={{
          url: 'https://wfh-abbrs.vercel.app',
          title: "Abbr's for people WFH",
          description: "Abbreviation's for people who is working from home (WFH)",
          images: [
            {
              url: 'https://wfh-abbrs.vercel.app/twitter.jpg',
              alt: "Abbr's for people WFH",
            },
          ],
          site_name: "Abbr's for people WFH",
        }}
        twitter={{
          handle: '@gokulkrishh',
          site: '@vercel.app',
          cardType: 'summary_large_image',
        }}
      />

      <h1>Abbreviation's for WFH</h1>
      <main>
        <div className="search">
          <input type="text" placeholder="Search for abbreviation's here..." onKeyUp={onKeyUp} innerRef={inputRef} />
        </div>
        <div className="list">
          <ul>
            {data.map((datum) => {
              return (
                <li className="card" key={datum.abbr} onClick={() => setClipboard(datum.abbr)}>
                  <div className="search-data-left">{datum.desc}</div>
                  <div className="search-data-right">{datum.abbr}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <footer>
        <a href="https://github.com/gokulkrishh/wfh-abbreviations" target="_blank" rel="noopener noreferrer">
          Send a pr if you know one
        </a>
      </footer>

      <style jsx>{`
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          margin-top: 30px;
        }

        main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-width: 520px;
        }

        footer {
          width: 100%;
          height: 45px;
          border-top: 2px solid var(--secondary-bg-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
        }

        ul {
          list-style-type: none;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          align-self: center;
        }

        .search-data-left {
          color: var(--secondary-text-color);
        }

        .list {
          min-width: 100%;
        }

        .list ul {
          width: 100%;
          margin: 0 auto;
          display: flex;
          padding: 0;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 1rem;
        }

        .list li {
          width: 90%;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          cursor: copy;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        input {
          max-width: 540px;
          width: 540px;
          height: 56px;
          padding: 0 15px;
          font-size: 18px;
          font-weight: normal;
          border-radius: 4px;
          box-shadow: none;
          border: 1px solid transparent;
          background-color: var(--secondary-bg-color);
          color: var(--primary-text-color);
        }

        @media (max-width: 600px) and (min-width: 481px) {
          main,
          .list,
          input,
          ul {
            width: 450px !important;
            max-width: 450px !important;
          }
        }

        @media (max-width: 480px) {
          main,
          .list,
          input,
          ul {
            width: 340px;
            max-width: 340px !important;
          }
        }
      `}</style>

      <style jsx global>{`
        :root {
          --primary-bg-color: #121212;
          --secondary-bg-color: #1f1f1f;
          --primary-text-color: #fff;
          --secondary-text-color: #7e7e7e;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-color: var(--primary-bg-color);
          color: var(--primary-text-color);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
