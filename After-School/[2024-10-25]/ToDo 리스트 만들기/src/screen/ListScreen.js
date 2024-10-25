import { Alert, View } from 'react-native';
import { useSateAreaInsets } from 'react-native-safe-area-context';
import EmptyList from '../components/EmptyList';
import List from '../components/List';
import InputFAB from '../components/InputFAB';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation, route }) => {
  const { bottom } = useSateAreaInsets();
  const [todos, setTodos] = useState([]);
  const { getItem, setItem } = useAsyncStorage('todos');

  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      setTodos(data);
    } catch (e) {
      Alert.alert('저장하기 실패', '데이터 저장에 실패했습니다.');
    }
  };

  const load = async () => {
    try {
      const data = await getItem();
      const todos = JSON.parse(data || '[]');
      setTodos(todos);
    } catch (e) {
      Alert.alert('불러오기 실패', '데이터 불러오기에 실패했습니다.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onInsert = (task) => {
    const id = nanoid();
    const newTodos = [{ id, task, isDone: false }, ...todos];
    save(newTodos);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    save(newTodos);
  };

  const onToggle = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );

    save(newTodos);
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      {todos.length ? (
        <List data={todos} onDelete={onDelete} onToggle={onToggle} />
      ) : (
        <EmptyList />
      )}
      <InputFAB onInsert={onInsert} />
    </View>
  );
};

export default ListScreen;
