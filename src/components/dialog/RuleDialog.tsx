
import { useChildContent } from "../../store/store";
import { VITE_API_ASSETS_IMAGE_URL } from "../../utils/urls";
import PageWrapper from "../PageWrapper";
export default function RuleDialog() {
    const { setChildContent } = useChildContent()
    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_IMAGE_URL}button-close.png`} />
                <img className="w-full max-w-[400px] mx-auto p-8 mt-20" src={`${VITE_API_ASSETS_IMAGE_URL}title.png`} alt="logo" />
                <div className="flex flex-col gap-4 max-w-[800px] w-full mx-auto text-white/60 text-lg md:text-2xl text-justify px-8 md:px-20 pb-10" style={{ fontFamily: "Myriad Pro" }}>

                    <p>Welcome to the establishment known as Heads & Tails!</p>
                    <p>Heads & Tails is a game of chance, commonly referred to as a Coin Flip, wherein participants are required to select one of the two sides of a coin. Success in the game hinges upon correctly predicting the outcome of the coin toss.</p>
                    <p className="text-white text-[32px] font-bold">How to play?</p>
                    <p>To commence the game, individuals are required to specify their desired wager in the designated Bet field and make a selection regarding which side of the coin they believe will appear. Upon making these choices, participants are prompted to initiate the coin toss by clicking on the "Flip" button. Following this action, the specified bet amount is deducted from the player's balance. Should the participant accurately forecast the outcome of the coin flip, they are deemed victorious and receive a reward equivalent to a predetermined multiplier of their initial bet. Conversely, failure to correctly predict the side of the coin results in loss.</p>
                    <p className="text-white text-[32px] font-bold">History</p>
                    <p>Within the "History" section, players can access a comprehensive overview of their previous gaming endeavors. This includes detailed information such as profits or losses incurred, the chosen side of the coin, and the final outcome of the toss.</p>
                </div>
            </div>
        </PageWrapper >
    )
}