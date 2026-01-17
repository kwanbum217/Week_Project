import { Box, Container, Heading, Text, VStack, SimpleGrid, Icon, Flex } from '@chakra-ui/react';
import { FaHandHoldingHeart, FaUserFriends, FaSmile, FaComments, FaLeaf, FaShieldAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

const ValueItem = ({ title, text, icon }) => (
    <VStack
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="md"
        spacing={3}
        align="center"
        textAlign="center"
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        height="100%"
        width="100%"
        className="group"
    >
        <Flex
            w={12}
            h={12}
            align="center"
            justify="center"
            color="var(--love-green)"
            bg="orange.50"
            rounded="full"
            mb={2}
            className="group-hover:bg-orange-100 transition-colors"
        >
            <Icon as={icon} w={6} h={6} />
        </Flex>
        <Heading size="sm" fontWeight="bold" color="var(--mooa-navy)">
            {title}
        </Heading>
        <Text color="gray.600" fontSize="sm">
            {text}
        </Text>
    </VStack>
);

const FeatureCard = ({ title, subtitle, icon }) => (
    <Flex
        align="center"
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.05)"
        transition="all 0.3s ease"
        _hover={{
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}
        border="1px solid"
        borderColor="gray.100"
        height="100%"
    >
        <Flex
            shrink={0}
            w={16}
            h={16}
            align="center"
            justify="center"
            bg="orange.50"
            color="var(--love-green)"
            borderRadius="2xl"
            mr={6}
        >
            <Icon as={icon} w={8} h={8} />
        </Flex>
        <Box>
            <Heading size="md" mb={2} color="var(--mooa-navy)">
                {title}
            </Heading>
            <Text color="gray.600" fontSize="md" wordBreak="keep-all">
                {subtitle}
            </Text>
        </Box>
    </Flex>
);

const ChatBubble = ({ isUser, children }) => (
    <Flex w="full" justify={isUser ? 'flex-end' : 'flex-start'} mb={6}>
        {!isUser && (
            <Flex
                w={10}
                h={10}
                rounded="full"
                bg="white"
                border="1px solid"
                borderColor="orange.200"
                align="center"
                justify="center"
                mr={3}
                shrink={0}
                mt={1}
            >
                <Icon as={FaSmile} color="var(--love-green)" w={5} h={5} />
            </Flex>
        )}
        <Box
            maxW={{ base: "85%", md: "70%" }}
            bg={isUser ? 'orange.100' : 'white'}
            color="gray.800"
            px={6}
            py={4}
            borderRadius="2xl"
            borderTopRightRadius={isUser ? '2px' : '2xl'}
            borderTopLeftRadius={!isUser ? '2px' : '2xl'}
            boxShadow="sm"
            border={!isUser ? '1px solid' : 'none'}
            borderColor={!isUser ? 'gray.100' : 'transparent'}
        >
            <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.6" wordBreak="keep-all">
                {children}
            </Text>
        </Box>
    </Flex>
);

const Intro = () => {
    const faqData = [
        {
            q: "MOOA는 어떤 서비스인가요?",
            a: <>MOOA는 시니어 세대를 위한 소셜 네트워킹 플랫폼입니다. 취미 모임, 친구 찾기, 1:1 대화 등 다양한 방식으로 새로운 인연을 만들고, 외로움을 달래며 활기찬 제2의 인생을 즐길 수 있도록 돕는 따뜻한 커뮤니티 공간입니다.</>
        },
        {
            q: "이용료는 무료인가요?",
            a: <>네, MOOA의 회원가입과 기본적인 커뮤니티 활동, 친구 찾기 기능은 모두 <strong>무료</strong>로 제공됩니다. 단, 일부 주최자가 운영하는 유료 클래스나 모임의 경우 별도의 참가비가 발생할 수 있습니다.</>
        },
        {
            q: "회원가입은 어떻게 하나요?",
            a: <>홈페이지 우측 상단의 <strong>'회원가입'</strong> 버튼을 클릭하신 후, 간단한 휴대폰 본인인증과 프로필 정보를 입력하시면 즉시 가입하실 수 있습니다. 어려우신 경우 고객센터로 연락 주시면 상세히 안내해 드립니다.</>
        },
        {
            q: "안전하게 이용할 수 있나요?",
            a: <>MOOA는 회원님들의 안전을 최우선으로 생각합니다. <strong>실명 인증 시스템</strong>을 도입하여 신뢰할 수 있는 회원만 활동하며, 24시간 모니터링과 강력한 신고 기능을 통해 불건전한 이용자를 즉시 제재하고 있습니다.</>
        },
        {
            q: "모임은 어떻게 만드나요?",
            a: <>로그인 후 상단 메뉴의 <strong>'모임하기'</strong>로 이동하여 <strong>'모임 개설'</strong> 버튼을 눌러보세요. 모임의 주제, 장소, 시간 등 간단한 정보만 입력하면 누구나 쉽게 모임장이 되어 사람들을 초대할 수 있습니다.</>
        }
    ];

    return (
        <Box className="font-sans" minHeight="100vh" display="flex" flexDirection="column">
            <Box flex="1">
                {/* Hero Section */}
                <Box position="relative" bg="var(--mooa-bg-warm)" bgImage="var(--mooa-gradient-warm)" pt={0} overflow="hidden">
                    <Box maxW="1980px" mx="auto" px="200px" py={8}>
                        <VStack spacing={8} textAlign="center" alignItems="center">
                            <Box className="animate-fade-in">
                                <Text
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    color="var(--love-green)"
                                    fontWeight="bold"
                                    mb={4}
                                >
                                    시니어 소셜 네트워킹 플랫폼
                                </Text>
                                <Heading
                                    as="h1"
                                    fontSize={{ base: "4xl", md: "6xl" }}
                                    fontWeight="900"
                                    lineHeight="1.2"
                                    color="var(--mooa-navy)"
                                    mb={6}
                                >
                                    MOOA<br />
                                    <span style={{ fontSize: '0.5em', display: 'block', marginTop: '20px', fontWeight: '500' }}>사람과 사람이 자연스럽게 이어지는 공간</span>
                                </Heading>
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="var(--mooa-text-secondary)"
                                    maxW="2xl"
                                    mx="auto"
                                    mb={10}
                                >
                                    ‘모이다(Moo)’와 ‘사람(A)’의 의미를 담아<br />
                                    당신의 일상에 새로운 활력을 더합니다.
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                </Box>

                {/* Brand Story */}
                <Box maxW="1980px" mx="auto" px="200px" py={24}>
                    <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" gap={16}>
                        <Box flex={1}>
                            <Heading size="2xl" mb={8} color="gray.800" lineHeight="1.4" wordBreak="keep-all">
                                누군가는 대화를 나누고 싶고,<br />
                                <span style={{ color: 'var(--love-green)' }}>누군가는 함께할 사람을 찾고 있습니다.</span>
                            </Heading>
                            <VStack align="start" spacing={6} fontSize="lg" color="gray.600">
                                <Text>
                                    빠르게 변하는 세상 속에서 우리는 가끔 외로움을 느낍니다.<br />
                                    하지만 비슷한 경험을 가진 친구와 함께라면<br />
                                    그 외로움은 즐거움으로 바뀔 수 있습니다.
                                </Text>
                                <Text>
                                    MOOA는 나이, 배경, 경험에 상관없이<br />
                                    누구나 <strong>편안하게 관계를 시작할 수 있는 공간</strong>을 제공합니다.
                                </Text>
                            </VStack>
                        </Box>
                        <Box flex={1} w="full">
                            <SimpleGrid columns={1} spacing={6}>
                                <FeatureCard
                                    icon={FaUserFriends}
                                    title="친구 찾기"
                                    subtitle="가볍게 인사하고, 편하게 대화할 수 있는 연결"
                                />
                                <FeatureCard
                                    icon={FaSmile}
                                    title="취미·모임"
                                    subtitle="공통의 관심사로 자연스럽게 이어지는 만남"
                                />
                                <FeatureCard
                                    icon={FaComments}
                                    title="1:1 이야기방"
                                    subtitle="진솔한 대화를 나눌 수 있는 안전한 공간"
                                />
                            </SimpleGrid>
                        </Box>
                    </Flex>
                </Box>

                {/* Core Values */}
                <Box bg="gray.50" py={24}>
                    <Box maxW="1980px" mx="auto" px="200px">
                        <VStack spacing={16}>
                            <Box textAlign="center">
                                <Heading size="xl" mb={4} color="gray.800">
                                    MOOA가 추구하는 가치
                                </Heading>
                                <Text fontSize="lg" color="gray.600">
                                    우리가 가장 중요하게 생각하는 네 가지 마음입니다.
                                </Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} w="full">
                                <ValueItem
                                    icon={FaSmile}
                                    title="편안함"
                                    text="어렵지 않고 부담 없는 사용성"
                                />
                                <ValueItem
                                    icon={FaHandHoldingHeart}
                                    title="따뜻함"
                                    text="사람 중심의 따뜻한 연결"
                                />
                                <ValueItem
                                    icon={FaShieldAlt}
                                    title="신뢰"
                                    text="안전하고 믿을 수 있는 커뮤니티"
                                />
                                <ValueItem
                                    icon={FaLeaf}
                                    title="지속성"
                                    text="일상이 이어지는 끈끈한 관계"
                                />
                            </SimpleGrid>
                        </VStack>
                    </Box>
                </Box>

                {/* FAQ Section (Chat Style) */}
                <Box py={24} bg="white">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <VStack spacing={12}>
                            <Box textAlign="center">
                                <Heading size="xl" mb={4} color="var(--mooa-navy)">
                                    MOOA에게 물어보세요 (FAQ)
                                </Heading>
                                <Text fontSize="lg" color="gray.600">
                                    궁금한 점이 있으신가요? 자주 묻는 질문들을 모아봤습니다.
                                </Text>
                            </Box>

                            <Box
                                w="full"
                                maxW="3xl"
                                mx="auto"
                                bg="gray.50"
                                p={8}
                                borderRadius="3xl"
                                boxShadow="inset 0 2px 4px rgba(0,0,0,0.05)"
                            >
                                <VStack spacing={2} w="full">
                                    {faqData.map((item, index) => (
                                        <Box key={index} w="full">
                                            {/* User Question */}
                                            <ChatBubble isUser={true}>
                                                {item.q}
                                            </ChatBubble>

                                            {/* Mooa Answer */}
                                            <ChatBubble isUser={false}>
                                                {item.a}
                                            </ChatBubble>
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </Box>

                {/* Promise Section */}
                <Box py={24} textAlign="center">
                    <Box maxW="1980px" mx="auto" px="200px">
                        <Icon as={FaHandHoldingHeart} w={12} h={12} color="var(--love-green)" mb={6} />
                        <Heading size="xl" mb={8} color="var(--mooa-navy)" fontWeight="bold">
                            “혼자가 아닌, 함께여서 더 좋은 일상”
                        </Heading>
                        <Text fontSize="xl" color="gray.600" lineHeight="1.8" mb={8}>
                            MOOA는 단순한 플랫폼이 아닌<br />
                            <strong>사람과 사람을 잇는 따뜻한 공간</strong>이 되고자 합니다.
                        </Text>
                        <Box w={20} h={1} bg="var(--love-green)" mx="auto" borderRadius="full" />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Intro;
