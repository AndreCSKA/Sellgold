import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useAdmStatus, useContractMethod, useGetMyGB, useRegStatus, useGetBuyGB, useBalance } from "../hooks";
import { utils } from "ethers";

type Props = {
    account: any;
    handleOpenModal: any;
    setHandleOpenModal: any;
    handleOpenModalMyGB: any;
    setHandleOpenModalMyGB: any;
    MyGB: any;
    setHandlerMyGB: any;
    handleOpenModalBuyGB: any;
    handleOpenModalToUp: any;
  };

export default function Registration({ account, handleOpenModal,setHandleOpenModal,
    handleOpenModalMyGB, setHandleOpenModalMyGB, MyGB , setHandlerMyGB, handleOpenModalBuyGB, handleOpenModalToUp}: Props) {
  const status = useAdmStatus(account.toString());
  const statusReg = useRegStatus(account.toString());

  const MyGBs = useGetMyGB(account.toString());
  const BuyGBs = useGetBuyGB(account.toString());
  const Balance=useBalance(account.toString())
  console.log(status+"!!!!!!!!!!!!!!!!!")
  const { state, send: registrateAccount } = useContractMethod("addMember");
  const { state: setCountState, send: setCount } = useContractMethod("setCount");
  const { state: twoVariablesState, send: setTwoVariables } =
    useContractMethod("takeTwoVariables");
  const [input, setInput] = useState("");
  var splitted;
  MyGBs? splitted = MyGBs.toString().split(','): splitted=""

  var k=0;
    for(var i=0;i<splitted.length;i+=7)
    {   
          k+=Number(splitted[i+3]);
    }
  function handleRegistration() {
    registrateAccount();
  }

  function handleSetCount() {
    const _count = parseInt(input);
    if (_count) {
      setCount(_count);
      setInput("");

    }
  }

  function handlerOpenMyGB()
  {
    setHandlerMyGB(MyGBs)
    setHandleOpenModalMyGB(true);
    
  }


  function handlerOpenTopUp()
  {
    handleOpenModalToUp(true);
  }

  function handlerOpenBuyGB()
  {
    setHandlerMyGB(BuyGBs)
    handleOpenModalBuyGB(true);
    
  }

  function handleTwoVariables() {
    const _count = parseInt(input);
    if (_count) {
      setTwoVariables(_count, 2, {
        value: utils.parseEther("0.05"),
      });
    }
  }

  function handleInput(valueAsString: string, valueAsNumber: number) {
    setInput(valueAsString);
  }

  return (
    <Flex direction="column" align="center" mt="4">
      <Text color="white" fontSize="30">
        
        {statusReg? "You are autorized in the Smart-Contract system!": "Registration is required, click the button below"}
      </Text>

      
      {!statusReg?
      <Button colorScheme="teal" size="lg" onClick={handleRegistration}>
        Registration
      </Button>:
      
      status? 
        
        <Flex direction="column" align="center" mt="4" justifyContent="space-between">
         
            <Text color="white" fontSize="30">
                You are administator
            </Text> 

            <Text color="white" fontSize="30">
              Your balance: {Balance?Balance.toNumber():0} USD   <Button colorScheme="green" size="md" onClick={handlerOpenTopUp} margin="10px" >
        Top up
        </Button>
            </Text>

            <Text color="white" fontSize="30">
        The total price of your bars: {k?k:0}   USD 
      </Text> 
        <Button colorScheme="purple" size="lg" onClick={handlerOpenMyGB } margin="10px" >
         My gold bars
        </Button>
       <Button colorScheme="purple" size="lg" onClick={()=>setHandleOpenModal(true)} margin="10px" >
       Add gold bar
        </Button>
        <Button colorScheme="purple" size="lg" onClick={handlerOpenBuyGB } margin="10px" >
         Buy gold bar
        </Button>
     </Flex>
       : 
       <Flex direction="column" align="center" mt="4" justifyContent="space-between">
        <Text color="white" fontSize="30">
        Your balance: {Balance?Balance.toNumber():0} USD <Button colorScheme="green" size="md" onClick={handlerOpenTopUp } margin="10px" >
          Top up
        </Button> 
      </Text> 
      <Text color="white" fontSize="30">
        The total price of your bars: {k?k:0} USD 
      </Text> 
       <Button colorScheme="purple" size="lg" onClick={handlerOpenMyGB } margin="10px" >
      My gold bars
     </Button>

     <Button colorScheme="purple" size="lg" onClick={handlerOpenBuyGB } margin="10px" >
         Buy gold bar
        </Button>
     </Flex>
       }
      
    </Flex>
  );
}