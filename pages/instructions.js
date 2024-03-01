// pages/instructions.js
import Head from 'next/head';
import React from 'react';

const InstructionsPage = () => {
    return (
        <div className="instructions-container">
            <Head>
                <title>Instructions - CoinQuest</title>
            </Head>
            <h1 className="instructions-title">Instructions</h1>
            <div className="instructions-content">
                <p>
                    Welcome, pirate! Here are your instructions for the Hunt:
                </p>
                <ol>

                    <li>Make sure you&apos;re on your laptop!</li>
                    <li>Make sure you enter your full KMIT roll number! Ex: 21BD1A05XX</li>
                    <li>You have time until 6:00 pm Tuesday (10 October)</li>
                    <li>Make sure you have a Hackerrank account.</li>
                    <li>Your activity is being tracked so make sure you do the hunt on your own!!! Code of conduct is important among pirates…</li>
                    <li>Make sure to have fun!</li>

                </ol>
            </div>
        </div>
    );
};

export default InstructionsPage;
