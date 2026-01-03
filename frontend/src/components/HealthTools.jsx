import React, { useState } from 'react';
import {
    Box,
    VStack,
    Heading,
    SimpleGrid,
    Box,
    VStack,
    Heading,
    SimpleGrid,
    Input,
    Button,
    Select,
    Text,
    HStack,
    Badge,
} from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';
import { FaCalculator, FaHeartbeat, FaRunning } from 'react-icons/fa';

const HealthTools = () => {
    const toast = useToast();

    // BMI State
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiStatus, setBmiStatus] = useState('');

    // Vitals State
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');

    // Exercise State
    const [exerciseType, setExerciseType] = useState('walking');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState(null); // Approximate

    // BMI Calculation
    const calculateBMI = () => {
        if (!height || !weight) {
            toast({
                title: '입력 오류',
                description: '키와 몸무게를 모두 입력해주세요.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        const h = parseFloat(height) / 100; // cm to m
        const w = parseFloat(weight);
        const bmiValue = (w / (h * h)).toFixed(1);
        setBmi(bmiValue);

        let status = '';
        let color = '';
        if (bmiValue < 18.5) { status = '저체중'; color = 'blue'; }
        else if (bmiValue < 23) { status = '정상'; color = 'green'; }
        else if (bmiValue < 25) { status = '과체중'; color = 'orange'; }
        else { status = '비만'; color = 'red'; }
        setBmiStatus({ label: status, color });
    };

    // Vitals Save (Mock)
    const saveVitals = () => {
        if (!systolic || !diastolic || !bloodSugar) {
            toast({
                title: '입력 오류',
                description: '모든 항목을 입력해주세요.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        toast({
            title: '기록 완료',
            description: '건강 수치가 성공적으로 기록되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setSystolic('');
        setDiastolic('');
        setBloodSugar('');
    };

    // Exercise Save (Mock)
    const saveExercise = () => {
        if (!duration) {
            toast({
                title: '입력 오류',
                description: '운동 시간을 입력해주세요.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        // Very rough estimate: METs * Kg * Time(hr) - defaulting weight to 65kg for estimation
        const mets = {
            walking: 3.5,
            running: 8,
            swimming: 6,
            cycling: 6,
            yoga: 2.5
        };
        const estCalories = Math.round(mets[exerciseType] * 65 * (parseFloat(duration) / 60));
        setCalories(estCalories);

        toast({
            title: '운동 기록 완료',
            description: `${duration}분 동안의 운동이 기록되었습니다. 약 ${estCalories}kcal 소모 예상!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setDuration('');
    };

    return (
        <Box py={10} px={6} bg="gray.50" borderRadius="xl" my={10}>
            <VStack spacing={8}>
                <Heading size="lg" color="gray.700" textAlign="center">
                    나의 건강 관리
                </Heading>

                <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full" maxW="6xl">
                    {/* BMI Calculator */}
                    {/* BMI Calculator */}
                    <Box borderRadius="xl" boxShadow="md" bg="white">
                        <Box p={5} pb={0}>
                            <HStack>
                                <Box p={2} bg="blue.100" borderRadius="lg" color="blue.500">
                                    <FaCalculator size={20} />
                                </Box>
                                <Heading size="md">BMI 계산기</Heading>
                            </HStack>
                        </Box>
                        <Box p={5}>
                            <VStack spacing={4}>
                                <HStack w="full" spacing={4}>
                                    <Box w="full">
                                        <Text fontSize="sm" mb={1} fontWeight="bold">신장 (cm)</Text>
                                        <Input
                                            type="number"
                                            placeholder="175"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </Box>
                                    <Box w="full">
                                        <Text fontSize="sm" mb={1} fontWeight="bold">체중 (kg)</Text>
                                        <Input
                                            type="number"
                                            placeholder="70"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </Box>
                                </HStack>
                                <Button w="full" colorScheme="blue" onClick={calculateBMI}>
                                    계산하기
                                </Button>
                                {bmi && (
                                    <Box w="full" p={4} bg={`${bmiStatus.color}.50`} borderRadius="md" textAlign="center">
                                        <Text fontSize="sm" color="gray.600">나의 BMI 지수</Text>
                                        <Heading size="lg" color={`${bmiStatus.color}.600`}>{bmi}</Heading>
                                        <Badge colorScheme={bmiStatus.color} mt={2} fontSize="md" px={3} py={1} borderRadius="full">
                                            {bmiStatus.label}
                                        </Badge>
                                    </Box>
                                )}
                            </VStack>
                        </Box>
                    </Box>

                    {/* Vitals Tracker */}
                    {/* Vitals Tracker */}
                    <Box borderRadius="xl" boxShadow="md" bg="white">
                        <Box p={5} pb={0}>
                            <HStack>
                                <Box p={2} bg="red.100" borderRadius="lg" color="red.500">
                                    <FaHeartbeat size={20} />
                                </Box>
                                <Heading size="md">건강 수치 기록</Heading>
                            </HStack>
                        </Box>
                        <Box p={5}>
                            <VStack spacing={4}>
                                <Box w="full">
                                    <Text fontSize="sm" mb={1} fontWeight="bold">혈압 (수축기 / 이완기)</Text>
                                    <HStack>
                                        <Input
                                            placeholder="120"
                                            value={systolic}
                                            onChange={(e) => setSystolic(e.target.value)}
                                        />
                                        <Text>/</Text>
                                        <Input
                                            placeholder="80"
                                            value={diastolic}
                                            onChange={(e) => setDiastolic(e.target.value)}
                                        />
                                    </HStack>
                                </Box>
                                <Box w="full">
                                    <Text fontSize="sm" mb={1} fontWeight="bold">식후 혈당 (mg/dL)</Text>
                                    <Input
                                        type="number"
                                        placeholder="140"
                                        value={bloodSugar}
                                        onChange={(e) => setBloodSugar(e.target.value)}
                                    />
                                </Box>
                                <Button w="full" colorScheme="red" variant="outline" onClick={saveVitals}>
                                    기록 저장
                                </Button>
                            </VStack>
                        </Box>
                    </Box>

                    {/* Exercise Tracker */}
                    {/* Exercise Tracker */}
                    <Box borderRadius="xl" boxShadow="md" bg="white">
                        <Box p={5} pb={0}>
                            <HStack>
                                <Box p={2} bg="green.100" borderRadius="lg" color="green.500">
                                    <FaRunning size={20} />
                                </Box>
                                <Heading size="md">오늘의 운동</Heading>
                            </HStack>
                        </Box>
                        <Box p={5}>
                            <VStack spacing={4}>
                                <Box w="full">
                                    <Text fontSize="sm" mb={1} fontWeight="bold">운동 종류</Text>
                                    <Select
                                        value={exerciseType}
                                        onChange={(e) => setExerciseType(e.target.value)}
                                    >
                                        <option value="walking">걷기 / 산책</option>
                                        <option value="running">달리기</option>
                                        <option value="cycling">자전거 타기</option>
                                        <option value="swimming">수영</option>
                                        <option value="yoga">요가 / 스트레칭</option>
                                    </Select>
                                </Box>
                                <Box w="full">
                                    <Text fontSize="sm" mb={1} fontWeight="bold">운동 시간 (분)</Text>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </Box>
                                <Button w="full" colorScheme="green" onClick={saveExercise}>
                                    운동 추가하기
                                </Button>
                            </VStack>
                        </Box>
                    </Box>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default HealthTools;
