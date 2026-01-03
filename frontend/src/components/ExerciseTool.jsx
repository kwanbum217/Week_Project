import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, Text } from '@chakra-ui/react';

const ExerciseTool = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const saveExercise = async () => {
        if (!exerciseType || !duration) return;

        const exerciseData = {
            exerciseType: exerciseType,
            durationMinutes: parseInt(duration)
        };

        // JWT 토큰 가져오기
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch('/api/health/exercise', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(exerciseData)
            });

            if (response.ok) {
                setMessage('✅ 운동 기록이 저장되었습니다!');
                setExerciseType('');
                setDuration('');
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
                <Heading size="md" color="gray.700">일일 운동 기록</Heading>
                <Box>
                    <Text mb={2} fontWeight="bold">운동 종류</Text>
                    <Input value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} placeholder="예: 걷기, 수영" />
                </Box>
                <Box>
                    <Text mb={2} fontWeight="bold">운동 시간 (분)</Text>
                    <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30" />
                </Box>
                <Button colorScheme="orange" onClick={saveExercise} width="full">
                    저장하기
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

export default ExerciseTool;
