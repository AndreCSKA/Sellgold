import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    NumberInput,
    NumberInputField,
    Input,
    ListItem,
  } from "@chakra-ui/react";
  import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
  import Identicon from "./Identicon";
  import { useState } from "react";
  import { useEthers } from "@usedapp/core";
  import { useRegStatus, useContractMethod, useGetMyGB, useGetStatus } from "../hooks";
  import { BigNumber, utils } from "ethers";

  type Props = {
    isOpen: any;
    onClose: any;
    MyGB: any;
    HandlerOpenBuyWindow: any;
    HandlerSetNumberIgnot: any;
    HandlerSetPriceIgnot: any;
    HandlerSetAddressIgnot: any;
    HandlerSetStatusIgnot: any;
  };
  
  export default function BuyIgnotModal({isOpen, onClose, MyGB, HandlerOpenBuyWindow, HandlerSetNumberIgnot, HandlerSetPriceIgnot , HandlerSetAddressIgnot, HandlerSetStatusIgnot}: Props) {
     
    var splitted = MyGB.toString().split(',');
    var arrObjects = [];
    var k=0;
    for(var i=0;i<splitted.length;i+=7)
    {
        arrObjects[k]={
          number: splitted[i],
          address: splitted[i+1],
          weight: splitted[i+2],
          price: splitted[i+3],
          status: getStatusName(splitted[i+4]),
          cert: splitted[i+5],
          desc: splitted[i+6]
             }
        k++;
    }

    function handleCloseWindow() {
       
        onClose(false);
    }

    function getStatusName(_status:Number)
    {
        if (_status==1) return "Close";
        if (_status==0) return "On Sale";
        if (_status==2) return "Released";
      
    }

    function handlerBuyBar(_number: Number, _Price:BigNumber, _address: String, _status: any)
    {
        HandlerOpenBuyWindow(true);
        HandlerSetNumberIgnot(_number);
        HandlerSetPriceIgnot(_Price);
        HandlerSetAddressIgnot(_address);
        HandlerSetStatusIgnot(_status.toString())
    }
    
    const listItems = arrObjects.map((item)=> {
      if(item.number!='')
        return ( <ListItem>
            <Box
                borderRadius="3xl"
                border="1px"
                borderStyle="solid"
                borderColor="gray.600"
                px={5}
                pt={4}
                pb={2}
                mb={3}
              >

                <Text color="gray.400" fontSize="sm">
                  <b>Number:</b>
                </Text>
                <Text color="gray.400" fontSize="sm">
                  
                    {item.number}
                </Text>

                <Text color="gray.400" fontSize="sm">
                  <b>Weight:</b>
                </Text>
                <Text color="gray.400" fontSize="sm">
                    {item.weight} grams
                </Text>  

                <Text color="gray.400" fontSize="sm">
                  <b>Coast:</b>
                </Text>
                <Text color="gray.400" fontSize="sm">
                    {item.price} USD
                </Text>

                <Text color="gray.400" fontSize="sm">
                <b>Status:</b> 
                </Text>
                <Text color="gray.400" fontSize="sm">
                    {item.status}
                </Text>

                <Text color="gray.400" fontSize="sm">
                <b> Certificate:</b>
                </Text>
                <Text color="gray.400" fontSize="sm">
                    {item.cert}
                </Text>

                <Text color="gray.400" fontSize="sm">
                <b> Desctiption:</b>
                </Text>
                <Text color="gray.400" fontSize="sm">
                    {item.desc}
                </Text>

                <Flex justifyContent="space-between" alignItems="center" mb={3} >
                { item.number!=""?
                <Button colorScheme="teal" size="lg" marginTop="20px" disabled={item.status=="On Sale"?false:true} onClick={()=>handlerBuyBar(item.number, item.price, item.address, item.status)}  >
                    Buy
                </Button>
                : null
                }
                </Flex>
                </Box>
        </ListItem>
            
        )
    else
    {return (
      <Text color="gray.400" fontSize="20px">
      <b>No bars available for purchase!</b>
    </Text>)
    }
    })
  

  return (
    <Modal isOpen={isOpen} onClose={handleCloseWindow}  size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Other gold bars
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
          
        
          {listItems}
          
   
          </Box>
 
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
