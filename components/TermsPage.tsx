import React from 'react';

const TermsPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 pt-24 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-8 tracking-wide text-emerald-400 text-center">
                    Fresco 2K25 – Terms and Conditions
                </h1>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 sm:p-8 space-y-6 text-gray-300">
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Event Timing:</h2>
                        <p>The Freshers Party will be held from 12:00 PM to 5:00 PM. All attendees are requested to arrive on time.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Alcohol and Intoxication:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Alcohol is strictly prohibited at the venue.</li>
                            <li>Any attendee found intoxicated or under the influence of alcohol will not be allowed entry.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Passes and Payments:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>All passes are non-refundable.</li>
                            <li>Payment made for the event cannot be refunded under any circumstances.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Parental Guidance and Responsibility:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>This is an unofficial event.</li>
                            <li>Attendees are advised to inform and seek consent from their parents or guardians.</li>
                            <li>The organizers and college will not be responsible for any issues arising during or after the event.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Transport:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>No transport facilities will be provided by the organizers.</li>
                            <li>The venue is located near a metro station for convenient access.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Smoking:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Smoking is allowed only outside the venue.</li>
                            <li>Smoking inside the venue is strictly prohibited.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">Food and Beverages:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Unlimited buffet will be available for 90 minutes only. Attendees are encouraged to enjoy the buffet within this time frame.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold font-orbitron text-emerald-400 mb-2">General Conduct:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>All attendees are expected to behave responsibly and respectfully.</li>
                            <li>Any violation of the above rules may result in denial of entry or removal from the event.</li>
                        </ul>
                    </div>
                    <p className="pt-4 text-center text-gray-400">
                        By purchasing a pass, you acknowledge and agree to abide by these Terms and Conditions.
                    </p>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
                    <button
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto text-emerald-400 border border-emerald-500/50 font-bold text-xl px-10 py-3 rounded-lg hover:bg-emerald-500/20 transition-all transform hover:scale-105"
                    >
                        Go Back
                    </button>
                    <a
                        href="https://forms.gle/JtL1PDNHg4NMV4AA9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center bg-emerald-500 text-black font-bold text-xl px-10 py-3 rounded-lg hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
                    >
                        Agree &amp; Book Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
