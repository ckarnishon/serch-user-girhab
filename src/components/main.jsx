import { useState, useEffect } from "react";
import {
  Container,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";

import Axios from "axios";


import "./styles.css";
import Content from "./content";

const BASE_URL = "https://api.github.com/";

function Main() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(' ');
  const [page, setPage] = useState(1);
  const [ prePage ] = useState(10);
  const [currentUser, setCurrentUser] = useState({});

  const [form, setForm] = useState('');

  const handlePageChange = (page) => {
      setPage(page)
      setCurrentUser({});
  }

  const handleChange = (event) => {
    setForm(event.target.value);
  }

  useEffect(() => {
    if (count === " ") {
      return;
    }
    setCurrentUser({});

    Axios.get(BASE_URL + `search/users?q=${count}&per_page=80&sort=${form}`)
      .then(({ data }) => {
        setPosts(data.items);
      });
  }, [count, page, form]);

  const lastIndex = page * prePage;
  const firstIndex = lastIndex - prePage;
  const currentPosts = posts.slice(firstIndex, lastIndex);
  const carrentPage = posts.length / prePage;

  return (
    <Container>
      <div className="serch">
        <TextField
          fullWidth
          label="Поиск"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
      </div>
      <div className="box">
        <Pagination
          count={Math.ceil(carrentPage)}
          page={page}
          onChange={(_, nam) => handlePageChange(nam)}
        />
        <div className="filter">
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Сортировка по:
            </InputLabel>
            <NativeSelect
              defaultValue={20}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option value="repositories">Количеству репозиториев</option>
              <option value="followers">Количеству подписчиков</option>
              <option value="joined">По активности в GitHub </option>
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      <Content
        posts={currentPosts}
        count={count}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </Container>
  );
}

export default Main