import createStyleSheet from '../common/createStyleSheet';
import colors from '../common/color';

export default createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 24,
    margin: 8,
    marginTop: 16,
    padding: 24,
    paddingBottom: 8,
  },
  textContainerWithoutAction: {
    paddingBottom: 32,
  },
  text: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 20,
  },
  subtext: {
    color: colors.secondaryText,
    fontSize: 16,
  },
  navContainer: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: colors.primaryColor,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    marginBottom: 8,
    marginTop: 24,
  },
  rating: {
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
  },
});
