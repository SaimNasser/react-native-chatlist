import { StyleSheet } from 'react-native';
import { height } from './methods';
export const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, overflow: 'hidden' },
  footerContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 18,
  },
  inverted: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  flexGrow: { flexGrow: 1 },
  loadingCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    color: 'black',
    width: '80%',
    borderRadius: 12,
    height: height(5),
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  floatingBtn: {
    backgroundColor: 'teal',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    // shadowColor: '#00000020',
    // shadowOffset: {
    //     width: 1,
    //     height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
