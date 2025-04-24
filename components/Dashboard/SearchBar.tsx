import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import styled from "styled-components";

const SearchBar = () => {
  return ( 
    <Container>
      <Input type="text" placeholder="Buscar aluno..." />
      <IconsContainer>
        <IconButton title="Ordenar lista">
          <FaSortAlphaDown size={18} />
        </IconButton>
        <IconButton title="Filtrar lista">
          <FaFilter size={18} />
        </IconButton>
      </IconsContainer>
    </Container>
   );
}
 
export default SearchBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  border-radius: 8px;
  padding: 8px 12px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: #E6E6E6;
  padding: 10px;
  border-radius: 20px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0A3D62;

  &:hover {
    color: #8360C3;
  }
`;