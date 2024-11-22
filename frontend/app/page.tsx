import React from 'react';
import FlaskConnector from "@/components/FlaskConnector";

export default async function Home() {
  return (
    <main>
      <section className="h-screen flex items-center justify-center" id="flask">
        <FlaskConnector />
      </section>
    </main>
  );
}