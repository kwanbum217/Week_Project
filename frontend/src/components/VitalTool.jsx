import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, SimpleGrid, Text } from '@chakra-ui/react';

const VitalTool = () => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');
    const [message, setMessage] = useState('');

    const saveVital = async () => {
        if (!systolic && !diastolic && !bloodSugar) return;

        const vitalData = {
            systolic: systolic ? parseInt(systolic) : null,
            diastolic: diastolic ? parseInt(diastolic) : null,
            bloodSugar: bloodSugar ? parseInt(bloodSugar) : null
        };

        // JWT 토큰 가져오기
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch('/api/health/vital', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(vitalData)
            });

            if (response.ok) {
                setMessage('✅ 건강수치가 저장되었습니다!');
                setSystolic('');
                setDiastolic('');
                setBloodSugar('');
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
                {message && (
                    <Text color={message.includes('✅') ? 'green.500' : 'orange.500'} fontWeight="bold" textAlign="center">
                        {message}
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default VitalTool;
