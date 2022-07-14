/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

export interface Price {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Bpi {
  USD: Usd;
  GBP: Gbp;
  EUR: Eur;
}

export interface Usd {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Gbp {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export const handler: Handlers<Price | null> = {
  async GET(_, ctx) {
    const resp = await fetch(url);
    if (resp.status === 200) {
      const price: Price = await resp.json();
      return ctx.render(price);
    }
    return ctx.render(null);
  },
};

export default function Home({ data }: PageProps<Price | null>) {
  if (!data) {
    return <h1>Data is not available</h1>;
  }

  return (
    <div class={tw`w-screen h-screen bg-gray-900`}>
      <div class={tw`p-8 mx-auto max-w-screen-md bg-gray-900`}>
        <img
          src="/Bitcoin.svg"
          width="200px"
          class="mx-auto"
          alt="bitcoin logo"
        />
        <p class={tw`my-10 text(center 3xl white)`}>Bitcoin Price checker</p>
        <p class={tw`my-10 text(center 2xl white)`}>
          USD: ${data.bpi.USD.rate}
        </p>
        <p class={tw`my-10 text(center 2xl white)`}>
          GBP: ${data.bpi.GBP.rate}
        </p>
        <p class={tw`my-10 text(center 2xl white)`}>
          EUR: ${data.bpi.EUR.rate}
        </p>
        <p class={tw`my-10 text(center 1xl white)`}>
          Last updated: ${data.time.updated}
        </p>
      </div>
    </div>
  );
}
