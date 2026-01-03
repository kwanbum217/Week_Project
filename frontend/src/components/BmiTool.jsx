import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, Text } from '@chakra-ui/react';

const BmiTool = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');

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

        // JWT 토큰 가져오기
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch('/api/health/bmi', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bmiData)
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
                setMessage('✅ BMI 기록이 저장되었습니다!');
            } else if (response.status === 401) {
                setMessage('⚠️ 로그인 후 이용해주세요');
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            setMessage('⚠️ 로그인 후 이용해주세요');
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
                {message && (
                    <Text color={message.includes('✅') ? 'green.500' : 'orange.500'} fontWeight="bold" textAlign="center">
                        {message}
                    </Text>
                )}
                {result && (
                    <Box pt={4} textAlign="center">
                        <Text fontSize="md" color="gray.600">나의 BMI</Text>
                        <Text fontSize="4xl" fontWeight="bold" color="blue.600">{result.bmiIndex}</Text>
                        <Text fontSize="lg" fontWeight="bold" color="gray.700">{result.result}</Text>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default BmiTool;
