export default function userRepository(repository) {
  
    const findByProperty = (params) => repository.findByProperty(params);
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const add = (user) => repository.add(user);
    const getUsers = () => repository.getUsers()
    const deleteById = (id) => repository.deleteById(id);
  
    return {
      findByProperty,
      countAll,
      findById,
      add,
      deleteById,
      getUsers
    };
  }
  