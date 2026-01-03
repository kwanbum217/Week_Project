import { Box, Flex, VStack, HStack, Text, SimpleGrid, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Box bg="var(--mooa-navy)" color="gray.300" py={12} fontSize="sm">
            <Box maxW="1980px" mx="auto" px="200px">
                {/* Top Row */}
                <Flex justify="space-between" align="start" mb={10} flexWrap="wrap" gap={8}>
                    <VStack align="start" spacing={4}>
                        <Flex align="center" gap={6}>
                            <Text fontSize="2xl" fontWeight="900" color="white" fontFamily="'Noto Sans KR', sans-serif">
                                MOOA
                            </Text>
                            <HStack spacing={4} fontSize="sm">
                                <Text as={RouterLink} to="/privacy-policy" color="white" textDecoration="underline" _hover={{ opacity: 0.8 }}>
                                    개인정보처리방침
                                </Text>
                                <Text as={RouterLink} to="/terms-of-service" color="white" textDecoration="underline" _hover={{ opacity: 0.8 }}>
                                    이용약관
                                </Text>
                            </HStack>
                        </Flex>
                    </VStack>

                    <VStack align="end" spacing={1}>
                        <Text fontSize="xs" mb={1}>고객 전용 문의</Text>
                        <Text color="white" fontWeight="bold">support@mooa-app.com</Text>

                        <Text fontSize="xs" mt={3} mb={1}>사업 제휴 문의</Text>
                        <Text color="white" fontWeight="bold">partnership@mooa-app.com</Text>
                    </VStack>
                </Flex>

                {/* Middle Row - Company Info */}
                <Box borderTop="1px solid" borderColor="whiteAlpha.200" pt={8} mb={8}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} fontSize="xs" lineHeight="1.6">
                        <Box>
                            <Text>대표 : 김무아</Text>
                            <Text>개인정보책임관리자 : 이보안</Text>
                            <Text>호스팅사업자 : (주)무아코퍼레이션</Text>
                        </Box>
                        <Box>
                            <Text>사업자등록번호 : 123-45-67890</Text>
                            <Text>서울특별시 강남구 테헤란로 123, 무아빌딩 4층</Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Bottom Row */}
                <Flex justify="space-between" align="center" pt={8} borderTop="1px solid" borderColor="whiteAlpha.200">
                    <Text fontSize="xs" color="whiteAlpha.600">
                        © Mooa Corporation. All rights reserved.
                    </Text>

                    <HStack spacing={4}>
                        <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </a>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default Footer;
