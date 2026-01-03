import { useState } from 'react';
import { Box, VStack, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';

const ExerciseTool = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const toast = useToast();

    const saveExercise = async () => {
        if (!exerciseType || !duration) return;

        const exerciseData = {
            exerciseType: exerciseType,
            durationMinutes: parseInt(duration)
        };

        try {
            const response = await fetch('/api/health/exercise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exerciseData)
            });

            if (response.ok) {
                toast({
                    title: '운동 기록 완료',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setExerciseType('');
                setDuration('');
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
            </VStack>
        </Box>
    );
};

export default ExerciseTool;
