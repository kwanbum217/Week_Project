import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';

const VitalTool = () => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');
    const toast = useToast();

    const saveVital = async () => {
        if (!systolic && !diastolic && !bloodSugar) return;

        const vitalData = {
            systolic: systolic ? parseInt(systolic) : null,
            diastolic: diastolic ? parseInt(diastolic) : null,
            bloodSugar: bloodSugar ? parseInt(bloodSugar) : null
        };

        try {
            const response = await fetch('/api/health/vital', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vitalData)
            });

            if (response.ok) {
                toast({
                    title: '건강수치 기록 완료',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setSystolic('');
                setDiastolic('');
                setBloodSugar('');
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            toast({
                title: '저장 실패',
                description: '서버와 통신 중 오류가 발생했습니다.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="xl" bg="white">
            <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.700">건강수치 기록</Heading>
                <SimpleGrid columns={2} spacing={2}>
                    <Box>
                        <Text mb={2} fontWeight="bold">수축기 혈압</Text>
                        <Input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="120" />
                    </Box>
                    <Box>
                        <Text mb={2} fontWeight="bold">이완기 혈압</Text>
                        <Input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="80" />
                    </Box>
                </SimpleGrid>
                <Box>
                    <Text mb={2} fontWeight="bold">혈당 (mg/dL)</Text>
                    <Input type="number" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} placeholder="95" />
                </Box>
                <Button colorScheme="teal" onClick={saveVital} width="full">
                    기록하기
                </Button>
            </VStack>
        </Box>
    );
};

export default VitalTool;
