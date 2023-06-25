import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
} from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const { data: villagers } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "showAllVillagers",
  });

  const data = useScaffoldContract({ contractName: "YourContract"});
  console.log(data);
  const contractAddress = data?.data?.address; 
  console.log(contractAddress);

  const [yourVillagers, setYourVillagers] = useState({});
  const { address } = useAccount();
  const [selectedVillager, setSelectedVillager] = useState("");

  useEffect(() => {
    let tempVillagers = {};
    villagers?.forEach((villager, idx) => {
      // debugger
      if (villager.owner === address){
        // debugger
        tempVillagers[idx] = villager;
      }

    setYourVillagers(() => tempVillagers)

    })
  },[villagers])

  const villagerTitle = () => {
    if (Object.keys(yourVillagers).length === 0){
      return <p>"You don't have any villagers at the moment try creating one to start building your FounderVille!" </p>
    } else {
      return <p>{`You have ${Object.keys(yourVillagers).length} villager(s):`}</p>
    }
  }

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-#004D00">Welcome to FounderVille</span>
          <br/>
          <div>
            {villagerTitle()}
          </div>
          <div className="flex flex-col self-center">
            {Object.values(yourVillagers).map((villager, idx) => (
              <a href={`https://tokenbound.org/assets/polygon/${contractAddress}/${idx}`} target="_blank" className="bg-white transition-colors duration-300 ease-in-out hover:bg-green-900">
                Name: {villager.name}
                <br/>
                Dexterity: {parseInt(villager.dex._hex, 16)}
                <br/>
                Intelligence: {parseInt(villager.intelligence._hex, 16)}
                <br/>
                Strength: {parseInt(villager.strength._hex, 16)}
                <img className="rounded-lg" src={`https://noun.pics/${parseInt(villager.dna._hex, 16)}`}></img>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
