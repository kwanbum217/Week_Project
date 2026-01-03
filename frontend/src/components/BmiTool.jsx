import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';

const BmiTool = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);
    const toast = useToast();

    const calculateAndSave = async () => {
        if (!height || !weight) return;

        const heightInMeters = parseFloat(height) / 100;
        const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
        let category = '';

        if (bmiValue < 18.5) category = '저체중';
        else if (bmiValue < 23) category = '정상';
        else if (bmiValue < 25) category = '과체중';
        else category = '비만';

        const bmiData = {
            height: parseFloat(height),
            weight: parseFloat(weight),
            bmiIndex: parseFloat(bmiValue.toFixed(2)),
            result: category
        };

        try {
            const response = await fetch('/api/health/bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bmiData)
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
                toast({
                    title: 'BMI 기록 완료',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
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
                <Heading size="md" color="gray.700">BMI 계산기</Heading>
                <Box>
                    <Text mb={2} fontWeight="bold">신장 (cm)</Text>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
                </Box>
                <Box>
                    <Text mb={2} fontWeight="bold">체중 (kg)</Text>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
                </Box>
                <Button colorScheme="blue" onClick={calculateAndSave} width="full">
                    계산 및 저장
                </Button>
                {result && (
                    <Box pt={4} textAlign="center">
                        <Box>
                            <Text fontSize="md" color="gray.600">나의 BMI</Text>
                            <Text fontSize="4xl" fontWeight="bold" color="blue.600">{result.bmiIndex}</Text>
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                {result.result}
                            </Text>
                        </Box>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default BmiTool;
