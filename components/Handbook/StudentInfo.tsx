import { Student } from "@/types/studentTypes";
import { RxAvatar } from "react-icons/rx";
import styled from "styled-components";

const StudentInfo = ({ student }: { student: Student }) => {
  return ( 
    <Container>
      <RxAvatar size={75} color="#13131A" />
      <TextWrapper>
        <SName>{student.name}</SName>
        <SInfo>{student.birthday}</SInfo>
      </TextWrapper>
    </Container>
   );
}
 
export default StudentInfo;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 8px 12px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const SName = styled.p`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
`;
const SInfo = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`;