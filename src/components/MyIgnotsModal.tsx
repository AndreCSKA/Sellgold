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
  import { utils } from "ethers";

  type Props = {
    isOpen: any;
    onClose: any;
    MyGB: any;
  };
  
  export default function MyIgnotsModal({isOpen, onClose, MyGB }: Props) {
     
    var splitted = MyGB.toString().split(',');
    const { state, send: OnSaleStatus } = useContractMethod("OnSaleById");
    const { state: setStatusClose, send: CloseStatus } = useContractMethod("OnCloseById");
    var arrObjects = [];
    var k=0;
    for(var i=0;i<splitted.length;i+=5)
    {
        arrObjects[k]={
            number: splitted[i],
            address: splitted[i+1],
            price: splitted[i+2],
            status: getStatusName(splitted[i+3]),
            desc: splitted[i+4]
             }
        k++;
    }

    function handleCloseWindow() {
       
        onClose(false);
    }

    function handleOnSaleStatus(_number: Number) {
       
        const __number = parseInt(_number.toString());
        OnSaleStatus(__number);

    }
    

    function handleCloseStatus(_number: Number) {
       
        const __number = parseInt(_number.toString());
        CloseStatus(_number);
    }

    function getStatusName(_status:Number)
    {
        if (_status==1) return "Close";
        if (_status==0) return "On Sale";
        if (_status==2) return "Released";
      
    }



 const listItems = arrObjects.map((item)=> {
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
              <b>Coast:</b>
            </Text>
            <Text color="gray.400" fontSize="sm">
                {item.price} ether
            </Text>

            <Text color="gray.400" fontSize="sm">
             <b>Status:</b> 
            </Text>
            <Text color="gray.400" fontSize="sm">
                {item.status}
            </Text>
            <Text color="gray.400" fontSize="sm">
             <b> Desctiption:</b>
            </Text>
            <Text color="gray.400" fontSize="sm">
                {item.desc}
            
               
            { item.number!=""?
             <Flex justifyContent="space-between" alignItems="center" mb={3} >
            <Button colorScheme="teal" size="lg" marginTop="20px" disabled={item.status=="Close" || item.status=="Released"?false:true} onClick={()=>handleOnSaleStatus(item.number)}>
                On sale
            </Button>
            <Button colorScheme="red" size="lg" marginTop="20px" disabled={item.status=="On Sale"?false:true}  onClick={()=>handleCloseStatus(item.number)}>
                Close
            </Button>
            </Flex>
            
            
            : null
            }
            
            </Text>
            </Box>
     </ListItem>
         
     )
 })

  return (
    <Modal isOpen={isOpen} onClose={handleCloseWindow} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          My gold bars
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
